import React from 'react';
import {Box, Slider} from "@mui/material";
import {useDispatch} from "react-redux";
import {setMaxCardsCountAC, setMinCardsCountAC} from "../../../features/cardPacks/cardPacks-reducer";


type SuperDoubleRangePropsType = {
    value1: number
    value2: number
    value3: number[]
    setValue1: (value1: number) => void
    setValue2: (value2: number) => void
    setValue3: (value3: number[]) => void
}

const minDistance = 1;

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        value1,
        value2,
        value3,
        setValue1,
        setValue2,
        setValue3,
    }) => {

    const dispatch = useDispatch()

    const handleChange1 = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (activeThumb === 0) {
            setValue3([Math.min(newValue[0], value2 - minDistance), value2]);
            setValue1(Math.min(newValue[0], value2 - minDistance));
            /*setTimeout(() => {*/
                dispatch(setMinCardsCountAC(Math.min(newValue[0], value2 - minDistance)))
            /*}, 3000)*/
            console.log('minCardCount: ', value1)
            console.log('value3: ', value3)
        } else {
            setValue3([value3[0], Math.max(newValue[1], value1 + minDistance)]);
            setValue2(value3[1])
          /* setTimeout(() => {*/
               dispatch(setMaxCardsCountAC(value3[1]));
        /*   }, 3000)*/
            console.log('maxCardCount: ', value2)
            console.log('value3: ', value3)
        }
    };


    return (
        <Box sx={{height: 300}}>
            <Slider
                step={1}
                size={"medium"}
                value={value3}
                onChange={handleChange1}
                //valueLabelDisplay="off"
                style={{color: '#C7A5A5'}}
                disableSwap
                orientation={"vertical"}
            />
        </Box>
    );
}

export default SuperDoubleRange

