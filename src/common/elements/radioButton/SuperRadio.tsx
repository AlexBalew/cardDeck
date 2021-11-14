import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from 'react'
import classes from './SuperRadio.module.css'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options: string[]
    onChangeOption: (option: string) => void
}

const SuperRadio: React.FC<SuperRadioPropsType> = (
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
       onChangeOption(e.currentTarget.value)
    }


    const mappedOptions = options.map((name, i) => {
            return  <label key={options[i] + '-' + i}>
                    <input
                        className={classes.radioInput}
                        type={'radio'}
                        onChange={onChangeCallback}
                        name='options'
                        value={name}
                        checked={name === value}
                    />
                    {}
                </label>
        }
    )

    return (
        <div >
            {mappedOptions}
        </div>
    )
}

export default SuperRadio
