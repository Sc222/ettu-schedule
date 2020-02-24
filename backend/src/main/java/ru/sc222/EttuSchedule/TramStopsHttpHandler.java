package ru.sc222.EttuSchedule;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import ru.sc222.EttuSchedule.ettu.TransportApi;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;

public class TramStopsHttpHandler implements HttpHandler {

    private static TransportApi transportApi;

    public TramStopsHttpHandler(TransportApi transportApi) {
        TramStopsHttpHandler.transportApi = transportApi;
    }

    @Override
    public void handle(HttpExchange httpExchange) throws IOException {
        handleRequest(httpExchange);
    }

    private static void handleRequest(HttpExchange httpExchange) throws IOException {
        String result = transportApi.getTramStops();
        URI requestURI = httpExchange.getRequestURI();
        String response = result;
       // String response = "This is the response at " + requestURI+"<br>All tram stops<br>"+result;
        Headers headers = httpExchange.getResponseHeaders();
        headers.add("Access-Control-Allow-Origin","http://localhost");
        headers.add("Content-Type","application/json; charset=utf-8");
        //todo cors header ?
        httpExchange.sendResponseHeaders(200, response.getBytes().length);
        OutputStream os = httpExchange.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }
}
