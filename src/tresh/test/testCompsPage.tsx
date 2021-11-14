import React from "react";
import SuperButton from "../../common/elements/button/SuperButton";
import SuperEditableSpan from "../../common/elements/editableSpan/SuperEditableSpan";
import SuperSelect from "../../common/elements/select/SuperSelect";
import SuperRadio from "../../common/elements/radioButton/SuperRadio";
import SuperCheckbox from "../../common/elements/checkbox/SuperCheckbox";
import SuperInput from "../../common/elements/input/SuperInput";
import Preloader from "../../common/components/preloader/Preloader";
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