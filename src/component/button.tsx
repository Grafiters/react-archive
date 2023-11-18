import { StyleSheet } from 'react-native';
import Color from './color'

export const ButtonStyle = {
    button_danger: () => {
        return {
            backgroundColor: Color.dangerColor().color,
            color: Color.lightColor().color,
            padding: 10,
            margin: 10,
            borderRadius: 5
        }
    },
    button_warning: () => {
        return {
            backgroundColor: Color.warningColor().color,
            color: Color.darkColor().color,
            padding: 10,
            margin: 10,
            borderRadius: 5
        }
    },
    button_success: () => {
        return {
            backgroundColor: Color.successColor().color,
            color: Color.lightColor().color,
            padding: 10,
            margin: 10,
            borderRadius: 5
        }
    },

    button_info: () => {
        return {
            backgroundColor: Color.infoColor().color,
            color: Color.lightColor().color,
            padding: 10,
            margin: 10,
            borderRadius: 5
        }
    }
}