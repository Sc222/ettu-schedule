package ru.sc222.EttuSchedule.ettu;

public class ScheduledTransport {
    public String name;
    public String timeRemaining;      // minutes
    public String distanceRemaining;  // meters

    public ScheduledTransport(String name, String timeRemaining, String distanceRemaining) {
        this.name = name;
        this.timeRemaining = timeRemaining;
        this.distanceRemaining = distanceRemaining;
    }
}
