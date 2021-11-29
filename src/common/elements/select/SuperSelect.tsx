import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react'
import s from './SuperSelect.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options: any[]
    onChangeOption?: (option: any) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = React.memo((
    {
        options,
        onChange, onChangeOption,
        ...restProps
    }
) => {

    const mappedOptions = options.map((name, i) => {
        return <option key={options[i] + ' ' + i} className={s.option} value={name}>{name}</option>;
    })

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        let currentValue = e.currentTarget.value
        if(onChangeOption)
        onChangeOption(+currentValue)
    }

    return (
        <select onChange={onChangeCallback} {...restProps} className={s.select}>
            {mappedOptions}
        </select>
    )
})

export default SuperSelect
