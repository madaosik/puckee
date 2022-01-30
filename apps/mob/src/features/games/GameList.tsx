import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { StyleSheet, SectionList, Pressable } from 'react-native';
import { Text, View } from '../../components/main/Themed';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { GameDay } from '../../types/game';

import { IGame } from "../../Types/index";
import { GameStackScreenProps } from '../../Types/navigation';
import { theme } from '../../utils/theme';
import { GameExcerpt } from './GameExcerpt';
import { fetchGames, selectAllGames, selectGamesByAttendeeId, selectGamesByOrganizerId, selectGamesBySkillLevel } from './gamesSlice';


const renderSectionHeader = ({section: {title}}: {section: any}) => (
  <View style={styles.sectionHeader}>
    <Text lightColor="#000" darkColor="#dcdcdc">{title}</Text>
  </View>
);

const renderGame = (game: IGame, { navigation }: GameStackScreenProps<'GamesList'>) =>  (
  <Pressable
    onPress={() => navigation.navigate('GameDetailsOverview', { gameId: game.id })}>
    <GameExcerpt { ...game }/>
  </Pressable>
);

const ListItemSeparator = () => {
  return (
    <View style={styles.listItemSeparatorStyle} />
  );
};

export default function GamesList({ route, navigation }: GameStackScreenProps<'GamesList'>) {
  const dispatch = useAppDispatch()
  const games: IGame[] = useAppSelector(selectAllGames)
  const { userData } = useAppSelector(state => state.auth)

  const { myAttended, myOrganized } = useAppSelector((state) => state.games.activeFilters)
  const { skillFilter, skillMinVal } = useAppSelector((state) => state.games.activeFilters.BySkill)

  const myAttGames = useAppSelector(state => selectGamesByAttendeeId(state, userData.id) )
  const myOrgGames = useAppSelector(state => selectGamesByOrganizerId(state, userData.id) )
  const skillGames = useAppSelector(state => selectGamesBySkillLevel(state, skillMinVal) )

  const gameStatus = useAppSelector(state => state.games.status)
  const error = useAppSelector(state => state.games.error)

  useEffect(() => {
    if (gameStatus === 'idle') {
      dispatch(fetchGames())
    }
  }, [gameStatus, dispatch])


  const reportFilters = () => {
      var reportStr: string[] = []
      if (myAttended) {
        reportStr.push("Games I'm attending (" + myAttGames.length + "/" + games.length + ")")
      }
      if (myOrganized) {
        reportStr.push("Games I'm organizing (" + myOrgGames.length + "/" + games.length + ")")
      }
      if (skillFilter) {
        reportStr.push("Games >level " + skillMinVal + " (" + skillGames.length + "/" + games.length + ")")
      }
      return reportStr.join(", ")
  }

  function getSections() {
    let srcGames: IGame[]

    if(myAttended) {
        console.log("jsem tu")
        srcGames = myAttGames
    } else if (myOrganized)  {
        srcGames = myOrgGames
    } else if (skillFilter) {
        srcGames = skillGames
    } else {
        srcGames = games
    }

    console.log(srcGames.length)
    const days = srcGames
      .map(game => game.start)
      .map(Date.parse)
      .map(d => format(d, "EEEE dd/MM/yyyy"))

      const uniqueDays = new Set<string>(days)
      const sections: GameDay[] = [];

      uniqueDays.forEach((gameDay) => {
        const section = {
          title: gameDay,
          data: srcGames.filter(game => format(Date.parse(game.start), "EEEE dd/MM/yyyy") === gameDay)
        };
        sections.push(section)
      });

      return sections
  }

  function body() {
    return (
      <View style={[styles.container]}>
        <Text>{error}</Text>
        {
          (myAttended || myOrganized || skillFilter)
            ? <View style={styles.filterReportView}>
              <Text style={{ fontWeight: 'bold' }}>Active filters: </Text><Text style={styles.filterReport}>{reportFilters()}</Text>
            </View>
            : null
        }
        <SectionList
            style={styles.container}
            sections={getSections()}
            keyExtractor={({id}: IGame) => id.toString()}
            renderItem={(listItem) => renderGame(listItem.item, {route, navigation})}
            renderSectionHeader={renderSectionHeader}
            ItemSeparatorComponent={ListItemSeparator}
        />
      </View>
    )
  }

  return (
    <View style={[styles.container]}>
      {
        (gameStatus === 'loading')
        ? <Text style={styles.loading}>Loading...</Text>
        : body()
      }
    </View>
  ); 
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    loading: {
      textAlign: "center",
      fontSize: 18,
      fontWeight: 'bold'
    },
    filterReportView: {
      flexDirection: 'row',
      marginVertical: 10
    },
    filterReport: {
      color: theme.colors.primary,
      fontWeight: 'bold',
      fontSize: 16,
      flexShrink: 1
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: "center"
    },
    column: {
      flexDirection: "column",
        flex: 1,
    },
    separator: {
      height: 1,
    },
    listItemSeparatorStyle: {
      height: 0.5,
      width: '100%',
      backgroundColor: '#000',
    },
    sectionHeader: {
      paddingLeft: 10,
      backgroundColor: "#dcdcdc",
      fontSize: 14,
      fontWeight: "bold"
    }
  });