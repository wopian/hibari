import JsonApi from 'devour-client'

export const Kitsu = new JsonApi({
  apiUrl: 'https://kitsu.io/api/edge',
  logger: false
})

Kitsu.headers['X-Requested-With'] = 'Hibari (wopian)'
Kitsu.headers['X-Forwarded-Host'] = 'hb.wopian.me'

Kitsu.define('user', {
  name: '',
  about: '',
  location: '',
  waifuOrHusbando: '',
  followersCount: '',
  createdAt: '',
  followingCount: '',
  lifeSpentOnAnime: '',
  birthday: '',
  gender: '',
  updatedAt: '',
  commentsCount: '',
  favoritesCount: '',
  likesGivenCount: '',
  reviewsCount: '',
  likesReceivedCount: '',
  postsCount: '',
  ratingsCount: '',
  proExpiresAt: '',
  title: '',
  avatar: '',
  coverImage: '',
  waifu: {
    jsonApi: 'hasOne',
    type: 'characters'
  },
  pinnedPost: {
    jsonApi: 'hasOne',
    type: 'posts'
  },
  profileLinks: {
    jsonApi: 'hasMany',
    type: 'profileLinks'
  },
  favorites: {
    jsonApi: 'hasMany',
    type: 'favorites'
  }
})

Kitsu.define('character', {
  slug: '',
  name: '',
  image: ''
})

Kitsu.define('post', {
  contentFormatted: '',
  commentsCount: '',
  postLikesCount: '',
  spoiler: '',
  nsfw: '',
  createdAt: '',
  editedAt: ''
})

Kitsu.define('profileLink', {
  url: ''
})

Kitsu.define('favorite', {
  favRank: '',
  item: {
    jsonApi: 'hasOne',
    type: ['characters', 'anime', 'manga']
  }
})

Kitsu.define('libraryEntry', {
  status: '',
  progress: '',
  updatedAt: '',
  ratingTwenty: '',
  anime: {
    jsonApi: 'hasOne',
    type: 'anime'
  },
  manga: {
    jsonApi: 'hasOne',
    type: 'manga'
  }
}, { collectionPath: 'library-entries' })

Kitsu.define('anime', {
  slug: '',
  titles: '',
  canonicalTitle: '',
  averageRating: '',
  userCount: '',
  startDate: '',
  endDate: '',
  popularityRank: '',
  ratingRank: '',
  ageRating: '',
  subtype: '',
  posterImage: '',
  episodeCount: '',
  synopsis: '',
  genres: {
    jsonApi: 'hasMany',
    type: 'genres'
  }
})

Kitsu.define('manga', {
  slug: '',
  titles: '',
  canonicalTitle: '',
  averageRating: '',
  userCount: '',
  startDate: '',
  endDate: '',
  popularityRank: '',
  ratingRank: '',
  ageRating: '',
  subtype: '',
  posterImage: '',
  chapterCount: '',
  synopsis: '',
  genres: {
    jsonApi: 'hasMany',
    type: 'genres'
  }
})

Kitsu.define('genre', {
  name: ''
})
