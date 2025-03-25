package com.example.guessgame;

import org.springframework.stereotype.Service;
import java.util.Random;

@Service
public class GuessGameService {
    private int randomNumber;
    private int attemptsLeft;
    private int score;

    public GuessGameService() {
        startNewGame();
    }

    public void startNewGame() {
        Random rand = new Random();
        randomNumber = rand.nextInt(100) + 1;
        attemptsLeft = 10;
    }

    public GuessResponse checkGuess(int userGuess) {
        if (attemptsLeft <= 0) {
            return new GuessResponse("Game Over! Start a new round.", false, randomNumber, score);
        }

        attemptsLeft--;

        if (userGuess == randomNumber) {
            score++;
            startNewGame();
            return new GuessResponse("Correct! You guessed the number.", true, randomNumber, score);
        } else if (userGuess < randomNumber) {
            return new GuessResponse("Too low! Try again.", false, randomNumber, score);
        } else {
            return new GuessResponse("Too high! Try again.", false, randomNumber, score);
        }
    }
}
