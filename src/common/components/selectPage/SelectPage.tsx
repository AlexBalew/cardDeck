import s from './SelectPage.module.css'
import React from 'react'
import SuperSelect from "../../elements/select/SuperSelect";

type SelectPageProps = {
    description?: string
    value?: any
    disabled?: boolean
    onChangeOptions?: (option: number) => void
}

export const SelectPage: React.FC<SelectPageProps> = ({
                                                           onChangeOptions,
                                                           value,
                                                           disabled = false,
                                                           description
                                                       }) => {
    const arrOptions = [10, 15, 20, 40]
    return (
        <div className={s.selectPage}>
            <span></span>
            <SuperSelect options={arrOptions}
                         onChangeOption={onChangeOptions}
                         value={value}
                         disabled={disabled}/>
            <span>{description}</span>
        </div>
    )
}