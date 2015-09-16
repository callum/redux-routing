import Path from 'path-parser'

export default function route (path, handler) {
  const matcher = new Path(path)

  return {
    build: matcher.build.bind(matcher),
    matcher,
    handler,
    path
  }
}
