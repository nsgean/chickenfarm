import React, { useEffect, useState } from 'react';
import SettingsScreen from '../../screens/Settings';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

function SettingsContainer() {
    const [values, setValues] = useState({})
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        setLoading(true)

        database()
            .ref('/Weight')
            .once('value')
            .then(snapshot => {
                const { min, max } = snapshot.val()
                console.log({ min, max })
                setValues({ min: "" + min, max: "" + max })
            })
            .catch(e => console.log({ e }))
            .finally(() => setLoading(false))
    }

    const onChange = (field, value) => {
        setValues(values => ({ ...values, [field]: value }))
    }

    const onSave = async () => {
        setSaving(true)

        database()
            .ref('/Weight')
            .update({
                min: parseInt(values.min),
                max: parseInt(values.max)
            })
            .then(() => Toast.show({
                type: 'success',
                text1: 'Salvo com sucesso!',
                visibilityTime: 1000
            }))
            .catch(() => Toast.show({
                type: 'error',
                text1: 'Erro ao salvar!',
                visibilityTime: 1000
            }))
            .finally(() => setSaving(false))
    }

    return (
        <SettingsScreen
            values={values}
            onChange={onChange}
            onSave={onSave}
            loading={loading}
            saving={saving}
        />
    );
}

export default SettingsContainer;