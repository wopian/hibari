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
    kitsuProfile: 'キツで見る',
    navigation: {
      profile: 'プロファイル',
      library: 'ライブラリー'
    },
    sociability: {
      title: 'Sociability',
      postsCount: 'Posts',
      commentsCount: 'コメント',
      likesGivenCount: '「いいね！」押した',
      likesReceivedCount: '「いいね！」もらいました',
      followingCount: 'Followed',
      followersCount: 'Followers'
    },
    about: {
      title: '概要'
    },
    library: {
      kind: {
        anime: 'アニメ',
        manga: 'マンガ'
      },
      toggle: {
        anime: '@:user.library.kind.anime Library',
        manga: '@:user.library.kind.manga Library'
      },
      status: {
        anime: {
          all: '全部の@:user.library.kind.anime',
          current: '今見ている',
          planned: '見たい',
          dropped: 'Dropped',
          completed: '見た',
          on_hold: 'On Hold'
        },
        manga: {
          all: '全部の@:user.library.kind.manga',
          current: '今読んでいる',
          planned: '読みたい',
          dropped: '@:user.library.status.anime.dropped',
          completed: '読んだ',
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
    title: 'バグ',
    body: '問題があれば<a href=\'//github.com/wopian/hibari/issues/new\'>GitHub Issue</a>を' +
    '書いてください.',
    requirements: '必要な情報:',
    include: {
      version: 'バージョン:',
      os: 'システム:',
      browser: 'ブラウザ:',
      browserVer: 'ブラウザのバージョン:',
      replicate: '何をすると問題が見えるようになりますか:'
    }
  },
  loader: {
    collectingData: 'データ回収中'
  }
}
