package ru.sc222.EttuSchedule.ettu;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

import java.io.IOException;
import java.net.URL;
import java.util.HashSet;

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
    public ArrayNode getTramsNearStop(int stopId) {
        return null;
    }

    @Override
    public ArrayNode getTrolleysNearStop(int stopId) {
        return null;
    }

    private String getStops(TransportType expectedType) throws IOException {
        URL url = new URL(API);
        HashSet<Transport> stopsList = new HashSet<>();
        ArrayNode stops = (ArrayNode) new ObjectMapper().readTree(url);
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
   ///private URL getApiUrl(String section) throws MalformedURLException {
   //     return new URL(String.format(API,section, StaticSettings.get().getTransportApiKey()));
   // }
}
