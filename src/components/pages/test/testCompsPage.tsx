import React from "react";
import SuperButton from "../../button/SuperButton";
import SuperEditableSpan from "../../editableSpan/SuperEditableSpan";
import SuperSelect from "../../select/SuperSelect";
import SuperRadio from "../../radioButton/SuperRadio";
import SuperCheckbox from "../../checkbox/SuperCheckbox";
import SuperInput from "../../input/SuperInput";
import Preloader from "../../preloader/Preloader";
import s from './testCompsPage.module.css'

type TestCompsPropsType = {}

export const TestComps = (props: TestCompsPropsType) => {
    return (<div className={s.main}>
            <div>
                <SuperButton>Hello</SuperButton>
            </div>
            <div>
                <SuperEditableSpan spanProps={{children: 'double click for the text changing'}}/>
            </div>
            <div>
                <SuperSelect options={['1', '2', '3']} onChangeOption={() => {
                }}/>
            </div>
            <div>
                <SuperRadio options={['1', '2', '3']} onChangeOption={() => {
                }}/>
            </div>
            <div>
                <SuperCheckbox/>
            </div>
            <div>
                <SuperInput/>
            </div>
            <div>
                <Preloader/>
            </div>
        </div>
    )
}