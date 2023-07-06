import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { PrimaryButton } from '../../components/Button';
import { PrimaryInput } from '../../components/Input';

function SettingsScreen({ values, onChange, onSave, loading, saving }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 20, }}>
            {loading
                ? <View>
                    <Image source={require("../../assets/images/logo-red-bg.png")} style={{ width: 250, height: 250 }} />
                    <Text style={{ textAlign: "center", color: "#332d27", fontWeight: "bold", fontSize: 18 }}>Carregando..</Text>
                </View>
                : <View>
                    <PrimaryInput
                        placeholder="Quantidade mínima"
                        value={values.min}
                        onChange={onChange}
                        field="min"
                    />
                    <PrimaryInput
                        placeholder="Quantidade máxima"
                        value={values.max}
                        onChange={onChange}
                        field="max"
                    />
                    <PrimaryButton
                        title={"Salvar"}
                        onPress={onSave}
                        disabled={saving}
                    />
                </View>
            }
        </View>
    );
}

export default SettingsScreen;