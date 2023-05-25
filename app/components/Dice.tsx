import React, { useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix } from '@fortawesome/free-solid-svg-icons';
import "./Dice.css";

type DiceProps = {
    sides: number;
};

const Dice: React.FC<DiceProps> = ({ sides }) => {
    const [result, setResult] = useState<number>(1);
    const [rolling, setRolling] = useState<boolean>(false);

    const rollDice = () => {
        if (!rolling) {
            setRolling(true);

            // Simulate a dice roll delay
            setTimeout(() => {
                const rolledResult = Math.floor(Math.random() * sides) + 1;
                setResult(rolledResult);
                setRolling(false);
            }, 500);
        }
    };

    let diceIcon = faDiceOne;
    if (result === 2) {
        diceIcon = faDiceTwo;
    } else if (result === 3) {
        diceIcon = faDiceThree;
    } else if (result === 4) {
        diceIcon = faDiceFour;
    } else if (result === 5) {
        diceIcon = faDiceFive;
    } else if (result === 6) {
        diceIcon = faDiceSix;
    }

    return (
        <div>
            <FontAwesomeIcon icon={diceIcon} onClick={rollDice} className={`w-24 ${rolling ? 'animate-shake' : ''}`} size={"6x"} color={"white"} />
        </div>
    );
};

export default Dice;