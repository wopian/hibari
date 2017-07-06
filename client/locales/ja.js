export default {
  lang: '日本語',
  hibari: 'ヒバリ',
  kitsu: 'Kitsu',
  strapline: 'キツの統計',
  notice: {
    id: '3',
    content: '早いアルファバージョンだからバグが多いかもしれません。'
  },
  navigation: {
    home: 'ホーム',
    bugs: 'バグ'
  },
  home: {
    strapline: '統計：',
    user: {
      head: '統計：',
      body: 'キツで{username}を検索する',
      placeholder: 'ユーザー名を入れて下さい...',
      action: 'ユーザーを検索する'
    },
    anime: {
      head: 'アニメ',
      body: 'キツで{anime}を検索する',
      placeholder: 'アニメの名を入れて下さい...',
      action: '検索'
    },
    manga: {
      head: 'マンガ',
      body: 'キツで{manga}を検索する',
      placeholder: 'マンガの名を入れて下さい...',
      action: '検索'
    }
  },
  user: {
    kitsuProfile: 'View on Kitsu',
    navigation: {
      profile: 'Profile',
      library: 'Library'
    },
    sociability: {
      title: 'Sociability',
      postsCount: 'Posts',
      commentsCount: 'Comments',
      likesGivenCount: 'Likes Given',
      likesReceivedCount: 'Likes Received',
      followingCount: 'Followed',
      followersCount: 'Followers'
    },
    about: {
      title: 'About'
    },
    library: {
      kind: {
        anime: 'Anime',
        manga: 'Manga'
      },
      toggle: {
        anime: '@:user.library.kind.anime Library',
        manga: '@:user.library.kind.manga Library'
      },
      status: {
        anime: {
          all: 'All @:user.library.kind.anime',
          current: 'Currently Watching',
          planned: 'Plan to Watch',
          dropped: 'Dropped',
          completed: 'Completed',
          on_hold: 'On Hold'
        },
        manga: {
          all: 'All @:user.library.kind.manga',
          current: 'Currently Reading',
          planned: 'Plan to Read',
          dropped: '@:user.library.status.anime.dropped',
          completed: '@:user.library.status.anime.completed',
          on_hold: '@:user.library.status.anime.on_hold'
        }
      },
      mediaBox: {
        episode: 'Ep {episode} of {total}',
        chapter: 'Ch {chapter} of {total}',
        rating: 'Rated {rating}/10'
      }
    }
  },
  bugs: {
    title: 'Bugs',
    body: 'Please create a <a href=\'//github.com/wopian/hibari/issues/new\'>GitHub Issue</a> ' +
    'for any bugs you encounter.',
    requirements: 'The following information is required to aid replication and fixing:',
    include: {
      version: 'Version:',
      os: 'Operating System:',
      browser: 'Browser:',
      browserVer: 'Browser Version:',
      replicate: 'Steps to replicate:'
    }
  },
  loader: {
    collectingData: 'Collecting Data'
  }
}
