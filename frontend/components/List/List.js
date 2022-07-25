import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";

var countries = [
    {
        country: 'Korean'
    },
    {
        country: 'Chinese'
    },
    {
        country: 'Japanese'
    },
    {
        country: 'Taiwanese'
    },
    {
        country: 'Thai'
    },
];

var dramas = [
    {
        title: 'Remarriage & desires',
        country: 'South-Korea',
        episodes: '8',
        duration: '60 min',
        genres: ['Drama', 'Melodrama']
    },
    {
        title: 'Doctor Stranger',
        country: 'South-Korea',
        episodes: '20',
        duration: '60 min',
        genres: ['Thriller', 'Romance', 'Drama', 'Medical']
    },
    {
        title: 'Descendants of the Sun',
        country: 'South-Korea',
        episodes: '16',
        duration: '60 min',
        genres: ['Action', 'Comedy', 'Romance', 'Melodrama']
    },
]

export default function ListPage() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {countries.map((country) => {
                    return (
                        <View style={styles.scroll}>
                            <Text style={styles.header}>{country.country}</Text>
                            <ScrollView style={styles.scrollview}>
                                {dramas.map((drama) => {
                                    return (
                                        <View>
                                            <Text style={styles.text}>Title: {drama.title}</Text>
                                            <Text style={styles.text}>Country: {drama.country}</Text>
                                            <Text style={styles.text}>Episodes: {drama.episodes}</Text>
                                            <Text style={styles.text}>Duration: {drama.duration}</Text>
                                            <Text style={styles.text}>Genres: {drama.genres}</Text>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    )
                })}
            </ScrollView>

            {/* <View style={styles.scroll}>
                <Text style={styles.header}>Korean</Text>
                <ScrollView style={styles.scrollview}>
                    <Text style={styles.text}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ScrollView>
            </View> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    scroll: {
        top: 10,
        marginTop: '5%',
        width: 400,
        height: 150,
    },
    scrollview: {
        backgroundColor: '#8A0707',
        borderRadius: 12,
        overflow: 'hidden',
        textAlign: 'center'
    },
    header: {
        color: '#fff',
        left: 10,
        fontSize: 25
    },
    text: {
        color: '#fff',
        fontSize: 15,
        left: 10
    }
});