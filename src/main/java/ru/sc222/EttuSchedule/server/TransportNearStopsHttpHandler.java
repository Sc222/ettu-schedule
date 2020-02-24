package ru.sc222.EttuSchedule.server;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import ru.sc222.EttuSchedule.ettu.TransportApi;

import java.io.IOException;

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
        String uri = httpExchange.getRequestURI().toString();
        String stop = uri.substring(uri.lastIndexOf("/") + 1);
        int stopId = stop.matches("[0-9]+") ? Integer.parseInt(stop) : 0;
        String result = transportApi.getTransportNearStop(stopId);
        ServerUtils.sendResponse(httpExchange, result, 200);
    }
}
