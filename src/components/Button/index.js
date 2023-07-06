import { Pressable, Text } from "react-native"

export const PrimaryButton = ({ title, onPress, disabled = false }) => {
    return (
        <Pressable disabled={disabled} style={{ borderRadius: 5, backgroundColor: disabled ? '#332d27' : "#8a0015", paddingHorizontal: 30, paddingVertical: 3, height: 35, justifyContent: "center", alignItems: "center" }} onPress={onPress}>
            <Text style={{ color: "white", fontWeight: "bold" }}>{title}</Text>
        </Pressable>
    )
}

export const BadgeButton = ({ title, onPress, disabled = false, active = false }) => {
    return (
        <Pressable disabled={disabled} style={{ borderRadius: 5, backgroundColor: disabled ? '#332d27' : active ? "#e30224" : "#8a0015", paddingHorizontal: 5, paddingVertical: 3, marginHorizontal: 3 }} onPress={onPress}>
            <Text style={{ color: "white" }}>{title}</Text>
        </Pressable>
    )
}