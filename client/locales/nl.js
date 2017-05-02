export default {
  lang: 'Nederlands',
  hibari: 'Hibari',
  kitsu: 'Kitsu',
  strapline: 'Statistieken voor Kitsu',
  notice: {
    id: '3',
    content: 'Deze versie is vroeg in ontwikkeling en er zullen daarom veel bugs aanwezig zijn, en niet alles zal correct werken.'
  },
  navigation: {
    home: 'Hoofdpagina',
    bugs: 'Bugs'
  },
  home: {
    strapline: 'Statistieken voor ',
    user: {
      head: 'Statistieken voor',
      body: 'Zoek {username} op Kitsu',
      placeholder: 'Voeg een username in...',
      action: 'Zoek een User'
    },
    anime: {
      head: 'Anime',
      body: 'Zoek voor {anime}',
      placeholder: 'voeg een anime in...',
      action: 'Zoeken'
    },
    manga: {
      head: 'Manga',
      body: 'Zoek voor {manga}',
      placeholder: 'voeg een manga in...',
      action: 'Zoeken'
    }
  },
  user: {
    kitsuProfile: 'Zie op Kitsu',
    navigation: {
      profile: 'Profiel',
      library: 'Bibliotheek'
    },
    sociability: {
      title: 'Sociaal',
      postsCount: 'Berichten',
      commentsCount: 'Reacties',
      likesGivenCount: 'Likes Gegeven',
      likesReceivedCount: 'Likes Gekregen',
      followingCount: 'Gevolgd',
      followersCount: 'Volgers'
    },
    about: {
      title: 'Over'
    },
    library: {
      kind: {
        anime: 'Anime',
        manga: 'Manga'
      },
      toggle: {
        anime: '@:user.library.kind.anime Bibliotheek',
        manga: '@:user.library.kind.manga Bibliotheek'
      },
      status: {
        anime: {
          all: 'Alle @:user.library.kind.anime',
          current: 'Momenteel aan het Kijken',
          planned: 'Geplanned om te Kijken',
          dropped: 'Gestopt',
          completed: 'Voltooid',
          on_hold: 'In de wacht'
        },
        manga: {
          all: 'Alle @:user.library.kind.manga',
          current: 'Momenteel aan het Lezen',
          planned: 'Geplanned om te Lezen',
          dropped: '@:user.library.status.anime.dropped',
          completed: '@:user.library.status.anime.completed',
          on_hold: '@:user.library.status.anime.on_hold'
        }
      },
      mediaBox: {
        episode: 'Afl. {episode} van de {total}',
        chapter: 'Hfst. {chapter} van de {total}',
        rating: 'Beoordeling: {rating}/10'
      }
    }
  },
  bugs: {
    title: 'Bugs',
    body: 'Maak alstublieft een <a href=\'//github.com/wopian/hibari/issues/new\'>GitHub Issue</a> ' +
    'aan wanneer u een bug tegenkomt.',
    requirements: 'De volgende informatie is nodig om de bug te repareren.',
    include: {
      version: 'Versie:',
      os: 'Operatie Systeem:',
      browser: 'Browser:',
      browserVer: 'Browser Versie:',
      replicate: 'Stappen om te repliceren:'
    }
  },
  loader: {
    collectingData: 'Gegevens Verzamelen'
  }
}
