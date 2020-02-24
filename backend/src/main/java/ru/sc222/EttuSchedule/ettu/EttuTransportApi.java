package ru.sc222.EttuSchedule.ettu;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import jdk.nashorn.internal.runtime.regexp.joni.Regex;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import sun.misc.Regexp;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

//preffered variant, faster and better
public class EttuTransportApi implements TransportApi {

    private static final String API = "http://online.ettu.ru/station/";
    private static final String ID = "i";
    private static final String NAME = "n";
    private static final String DIRECTION = "d";
    private static final String TYPE = "l";

    @Override
    public String getTramStops() throws IOException {
        return getStops(TransportType.TRAM);
    }

    @Override
    public String getTrolleyStops() throws IOException {
        return getStops(TransportType.TROLLEY);
    }

    @Override
    public String getTransportNearStop(int stopId) throws IOException {
        Pattern pattern = Pattern.compile("[0-9]{1,3} [0-9]{1,3} мин [0-9]{1,5} м", Pattern.CASE_INSENSITIVE);

        try {
            Document doc = Jsoup.connect(API+stopId).get();
            Elements transportParent = doc.getElementsByTag("div");
            List<ScheduledTransport> result = transportParent
                    .eachText()
                    .stream()
                    .filter(s-> pattern.matcher(s).matches())
                    .map(s->{
                        String[]strings = s.split(" ");
                        return new ScheduledTransport(strings[0],strings[1],strings[3]);
                    })
                    .collect(Collectors.toList());
            return new ObjectMapper().writeValueAsString(result);
        } catch (IOException e) {
            e.printStackTrace();

            //todo store error scheduled transport const
            return new ObjectMapper()
                    .writeValueAsString(new ScheduledTransport[]{
                    new ScheduledTransport("error","0","0")
            });
        }
    }

    private String getStops(TransportType expectedType) throws IOException {
        URL url = new URL(API);
        HashSet<Transport> stopsList = new HashSet<>();
        ArrayNode stops;
        try {
            stops = (ArrayNode) new ObjectMapper().readTree(url);
        }
        catch (IOException e){
            return new ObjectMapper().writeValueAsString(new Transport(-1,"Error",""));
        }
        for(JsonNode stop: stops)
        {
            int id = stop.get(ID).asInt(Integer.MIN_VALUE);
            String name = stop.get(NAME).asText("");
            String direction = stop.get(DIRECTION).asText("");
            int rawType = stop.get(TYPE).asInt(0);
            TransportType type = TransportType.fromInt(rawType);
            if(!name.isEmpty() && type==expectedType)
                stopsList.add(new Transport(id,name,direction));
        }
        return new ObjectMapper().writeValueAsString(stopsList);
    }

}
