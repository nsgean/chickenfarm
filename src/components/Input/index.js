import { Text, TextInput, View } from "react-native"
import MaskInput, { createNumberMask } from "react-native-mask-input";

const kgMask = createNumberMask({
    prefix: [''],
    delimiter: '.',
    separator: ',',
    precision: 0,
})

export const PrimaryInput = ({ placeholder = "", value, onChange, field }) => {
    return (
        <View style={{ marginBottom: 10 }}>
            <Text>{placeholder} em gramas</Text>
            <MaskInput
                style={{
                    height: 40,
                    marginVertical: 12,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5
                }}
                placeholder={placeholder}
                value={value}
                onChangeText={(masked) => {
                    onChange(field, masked);
                }}
                mask={kgMask}
            />
        </View>
    )
}