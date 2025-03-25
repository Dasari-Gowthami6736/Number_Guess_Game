package com.example.guessgame;

public class GuessResponse {
    private String message;
    private boolean correct;
    private int correctNumber;
    private int score;

    public GuessResponse(String message, boolean correct, int correctNumber, int score) {
        this.message = message;
        this.correct = correct;
        this.correctNumber = correctNumber;
        this.score = score;
    }

    public String getMessage() {
        return message;
    }

    public boolean isCorrect() {
        return correct;
    }

    public int getCorrectNumber() {
        return correctNumber;
    }

    public int getScore() {
        return score;
    }
}
