package io.airhacks.validator.entity;

public class Result {

    public boolean ok;
    public int status;

    public Result(boolean ok,int status){
        this.ok = ok;
        this.status = status;
    }
    
}