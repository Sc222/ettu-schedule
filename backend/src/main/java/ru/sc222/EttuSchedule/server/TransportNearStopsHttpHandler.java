package ru.sc222.EttuSchedule.server;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import ru.sc222.EttuSchedule.ettu.TransportApi;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;

public class TransportNearStopsHttpHandler implements HttpHandler {

    private TransportApi transportApi;

    public TransportNearStopsHttpHandler(TransportApi transportApi) {
        this.transportApi = transportApi;
    }

    @Override
    public void handle(HttpExchange httpExchange) throws IOException {
        handleRequest(httpExchange);
    }

    private void handleRequest(HttpExchange httpExchange) throws IOException {
        URI requestURI = httpExchange.getRequestURI();
        String uri =  requestURI.toString();
        String stop = uri.substring(uri.lastIndexOf("/")+1);
        int stopId = stop.matches("[0-9]+") ? Integer.parseInt(stop) : 0;
        String response = transportApi.getTransportNearStop(stopId);

        Headers headers = httpExchange.getResponseHeaders();
        headers.add("Access-Control-Allow-Origin","http://localhost");
        headers.add("Content-Type","application/json; charset=utf-8");
        httpExchange.sendResponseHeaders(200, response.getBytes().length);
        OutputStream os = httpExchange.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }
}
