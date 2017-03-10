# Changelog

## [0.1.0] - 2017-03-08
### Fixed
- Navbar position on mobile
- Mobile padding issue causing horizontal scroll on user pages
- Usernames with underscores are searchable

### Added
- Notice remembers dismissal
- Navbar is translucent on user/media pages while cover is visible
- Locally caches user data
  - **Note: Currently no way to update the data in this version**
- Favourite anime/manga/characters on user pages

### Changed
- Colour scheme changed from green to Kitsu purple
- User/media covers are now 400px - matching Kitsu
- User profile mimics Kitsu profiles for a seamless transition
- Darkened covers to match Kitsu
- Moved notice to bottom of viewport
- Favourites use small poster sizes instead of large
- 'Kitsu Profile' button on user pages changed to 'View on Kitsu'

## [0.0.1] - 2017-02-10
### Fixed
- Outputting debug information to console in production

### Added
- Development notice to top of pages
- GitHub Corner in top right of page
- Formatting for the User section in Home
- Added manifest
- Localised the current strings

### Changed
- Use native language in footer, instead of its English name
- Changed `static` to `public`
- Changed icon to a green version of Kitsu - like with previous version of Hibari

## [0.0.1-alpha] - 2017-02-09
### Added
- Basic functionality. No styling or formating, just displaying user, anime & manga information via
Kitsu's API.

[0.1.0]:https://github.com/wopian/hibari/compare/0.0.1...0.1.0
[0.0.1]:https://github.com/wopian/hibari/compare/0.0.1-alpha...0.0.1
[0.0.1-alpha]:https://github.com/wopian/hibari/compare/ac9bd7571d3059482f5868b7419e2ff327aa803c...0.0.1-alpha
