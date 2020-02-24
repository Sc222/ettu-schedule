package server;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;
import java.net.URL;

public class TrollStopsHttpHandler  implements HttpHandler {
    @Override
    public void handle(HttpExchange httpExchange) throws IOException {
        handleRequest(httpExchange);
    }

    private static void handleRequest(HttpExchange httpExchange) throws IOException {
        String result = getEttuTrollStops();
        URI requestURI = httpExchange.getRequestURI();
        String response = "This is the response at " + requestURI+"<br>All troll stops<br>"+result;
        Headers headers = httpExchange.getResponseHeaders();
        headers.add("Content-Type","text/html; charset=utf-8");
        httpExchange.sendResponseHeaders(200, response.getBytes().length);
        OutputStream os = httpExchange.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }

    private static String getEttuTrollStops() throws IOException {
        StringBuilder result = new StringBuilder();
        URL url = new URL("http://map.ettu.ru/api/v2/troll/points/?apiKey=111");
        ArrayNode stops = (ArrayNode) new ObjectMapper().readTree(url).get("points");
        for(JsonNode stop: stops)
        {
            int id = stop.get("ID").asInt(Integer.MIN_VALUE);
            String name = stop.get("NAME").asText("");
            String direction = stop.get("DIRECTION").asText("");
            if(!name.isEmpty())
            {
                StringBuilder tmp = new StringBuilder("<br>"+id+" "+name);
                if(!direction.isEmpty())
                    tmp.append("(").append(direction).append(")");
                result.append(tmp.toString());
                System.out.println(tmp.toString());
            }
        }
        return result.toString();
    }
}