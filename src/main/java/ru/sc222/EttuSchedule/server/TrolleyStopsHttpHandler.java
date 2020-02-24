package ru.sc222.EttuSchedule.server;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import ru.sc222.EttuSchedule.ettu.TransportApi;

import java.io.IOException;

public class TrolleyStopsHttpHandler implements HttpHandler {

    private TransportApi transportApi;

    public TrolleyStopsHttpHandler(TransportApi transportApi) {
        this.transportApi = transportApi;
    }

    @Override
    public void handle(HttpExchange httpExchange) throws IOException {
        handleRequest(httpExchange);
    }

    private void handleRequest(HttpExchange httpExchange) throws IOException {
        String result = transportApi.getTrolleyStops();
        ServerUtils.sendResponse(httpExchange, result, 200);
    }
}