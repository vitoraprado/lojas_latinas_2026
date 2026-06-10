export function wrap(handler) {
  return (req, res) =>
    Promise.resolve(handler(req, res))
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          ERROR: 'Internal error',
          DETAILS: String(err.message || err)
        });
      });
}