package ru.sc222.EttuSchedule.server;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import ru.sc222.EttuSchedule.ettu.TransportApi;

import java.io.IOException;

public class TramStopsHttpHandler implements HttpHandler {

    private TransportApi transportApi;

    public TramStopsHttpHandler(TransportApi transportApi) {
        this.transportApi = transportApi;
    }

    @Override
    public void handle(HttpExchange httpExchange) throws IOException {
        handleRequest(httpExchange);
    }

    //todo cors header ?
    //todo make server send error response headers on getting data error
    private void handleRequest(HttpExchange httpExchange) throws IOException {
        String result = transportApi.getTramStops();
        ServerUtils.sendResponse(httpExchange, result, 200);
    }
}
