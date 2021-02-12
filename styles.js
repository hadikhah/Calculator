import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    background: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    header: {
        flexDirection: 'row',
        flex: 3,
        alignItems: 'center'
    }, body: {
        flex: 5,
        padding: 5,
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
    },
    button: {
        flex: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLable: {
        color: 'white',
        fontSize: 20,
    },
    input: {
        flex: 1,
        color: 'white',
        fontSize: 40,
        textAlign: 'right',
        padding: 30,
        marginHorizontal: 20,
        marginRight: 30,
    }
})