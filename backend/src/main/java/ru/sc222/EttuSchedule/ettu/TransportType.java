package ru.sc222.EttuSchedule.ettu;

public enum TransportType{
    NONE,
    TRAM,
    TROLLEY;

    public static TransportType fromInt(int value)
    {
        switch (value){
            case 1:
                return TRAM;
            case 2:
                return TROLLEY;
            default:
                return NONE;
        }
    }
}