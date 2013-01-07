authenticate()

# Prevent exit when there are unsaved changes
window.onbeforeunload = (event) ->
  conf = App.instance.confirmExit e
  return null if c is true

  event = event || window.event
  event.returnValue = conf if event

  conf

loadApplication (err, data) ->

  window.app.instance = new app.views.Application({ el: '#container', model: data }).render()

  if (err)
    return app.instance.notify 'error', 'Error while loading data from Github. This might be a temporary issue. Please try again later.'

  window.router = new app.routers.Application()
  Backbone.history.start()

