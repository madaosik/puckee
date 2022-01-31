import React, {useState, Component, useEffect} from 'react';
// import { getToken } from '../../src/utils/auth';
import { Button, FormInput } from '../../components';
import { useAppSelector } from 'puckee-common/redux'
// import history from '../../utils/history';

// import history from '../routes/history';
// import { Credentials } from './authSlice'
import { signUp } from './authSlice';
import Select, {ActionMeta} from 'react-select';
import makeAnimated from 'react-select/animated';
import { playerRoleOptions } from 'puckee-common/utils';
import { AthleteRoleOption, AthleteRole } from 'puckee-common/types'
// import { AthleteRole } from '../../types';
import SkillPucks from '../../components/SkillPucks';
// import Box from '@mui/material/Box'
// import Slider from '@mui/material/Slider'
// import { ValueType } from "react-select/lib/types";

export default function SignUpForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const dispatch = useAppDispatch();
    const {status} = useAppSelector((state) => state.auth);
    const roleOptions = playerRoleOptions()
    const [selectedRoles, setSelectedRoles] = useState<AthleteRoleOption[] | unknown>(roleOptions[0])
    const [perfLevel, setPerfLevel] = useState(0)

    // Temporary selected roles storage to ensure the MultiSelect is not re-rendered
    var selectedTemp = [] as AthleteRoleOption

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault()
        // const cred: Credentials = {email: email, password: password}
        
        // dispatch(signup())
    }
    const handleSelectionUpdate = (option: readonly AthleteRoleOption[] | unknown, actionMeta: ActionMeta<AthleteRoleOption>) => {
        // setSelectedRoles(option)
        selectedTemp = option
    }

    useEffect(() => {
        console.log(selectedRoles)
    }, [selectedRoles])

    const AnimatedMultiSelect = () => {
        return (
          <Select
            closeMenuOnSelect={false}
            components={makeAnimated()}
            defaultValue={selectedRoles}
            isMulti
            options={roleOptions}
            placeholder="Vyber svoje role..."
            className="roleMultiSelect"
            onChange={handleSelectionUpdate}
            noOptionsMessage={() => null}
            onMenuClose={() => {
                setSelectedRoles(selectedTemp as AthleteRoleOption[])
                // console.log(selectedRoles)
            }}
          />
        );
      }

    return (
        <div className="loginForm">
            <form onSubmit={handleSignUp}>
                <FormInput 
                    onChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
                    placeholder="Jméno" type="text" value={name}/>
                <FormInput 
                    onChange={(e: React.FormEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
                    placeholder="E-mail" type="email" value={email}/>
                <FormInput
                    onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
                    placeholder="Heslo" type="password" value={password}/>
                <AnimatedMultiSelect/>
                <SkillPucks perfLevel={perfLevel} puckSize={30} iconKey={'signUpPuck'} className="signUpPucks"/>
                {/* <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" /> */}
                { status === 'loading' ? <div className="loading"><span>Přihlašování...</span></div>
                : 
                <Button type="submit" caption="Registruj!"/>}
            </form>
        </div>
    )
}