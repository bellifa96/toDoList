import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    content: {
        marginHorizontal: 30,
        flex: 1,
    },

    loader: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    btnAdd: {
        backgroundColor: '#dee2e6',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        marginBottom: 10,
    },

    btnOutline: {
        borderColor: '#dee2e6',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 10,
        alignItems: 'center',
    },

    btnText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, 0.7)',
    },

    colors: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        height: 50,
        marginTop: 10,
        marginBottom: 10,
    },

    btnColor: {
        flexGrow: 1,
        maxWidth: 50,
        marginRight: 5,
        borderRadius: 20,
    },

    input: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 10,
    },

    scrollList: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20
    },

    listData: {
        opacity: 0.8,
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },

    listColor: {
        flex: 1,
        minWidth: 5,
        minHeight: 10,
        borderRadius: 5,
        marginRight: 10
    },

    listTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 10
    },

    listTitleBorder: {
        borderBottomColor: "rgba(255,255,255,0.4)",
        borderBottomWidth: 1,
        marginBottom: 15,
        width: '100%',
    },

    listText: {
        fontSize: 15,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        color: '#fff'
    },

    listNumber: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
    }
})