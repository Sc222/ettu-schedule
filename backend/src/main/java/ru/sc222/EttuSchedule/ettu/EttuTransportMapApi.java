package ru.sc222.EttuSchedule.ettu;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import ru.sc222.EttuSchedule.settings.StaticSettings;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashSet;

//another variant, but takes more time to parse
public class EttuTransportMapApi implements TransportApi {

    private static final String API = "http://map.ettu.ru/api/v2/%s/?apiKey=%s";
    private static final String TRAM_STOPS = "tram/points";
    private static final String TROLLEY_STOPS = "troll/points";

    @Override
    public String getTramStops() throws IOException {
        return getStops(TRAM_STOPS);
    }


    @Override
    public String getTrolleyStops() throws IOException {
        return getStops(TROLLEY_STOPS);
    }

    @Override
    public ArrayNode getTramsNearStop(int stopId) {
        return null;
    }

    @Override
    public ArrayNode getTrolleysNearStop(int stopId) {
        return null;
    }

    private String getStops(String trolleyStops) throws IOException {
        URL url = getApiUrl(trolleyStops);
        HashSet<Transport> stopsList = new HashSet<>();
        ArrayNode stops = (ArrayNode) new ObjectMapper().readTree(url).get("points");
        for(JsonNode stop: stops)        {
            int id = stop.get("ID").asInt(Integer.MIN_VALUE);
            String name = stop.get("NAME").asText("");
            String direction = stop.get("DIRECTION").asText("");
            if(!name.isEmpty())
                stopsList.add(new Transport(id,name,direction));
        }
        return new ObjectMapper().writeValueAsString(stopsList);
    }

    private URL getApiUrl(String section) throws MalformedURLException {
        return new URL(String.format(API,section,StaticSettings.get().getTransportApiKey()));
    }
}
