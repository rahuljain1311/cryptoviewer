module Navbar  where

import Prelude
import React.DOM as D
import React.DOM.Props as P
import Data.Maybe
import Data.Nullable (toMaybe, Nullable)
import Utils.Class
import Data.Tuple
import Control.Monad.Eff (Eff)
import React (ReactClass, createClassStateless, ReactElement, createFactory, ReactProps, ReactRefs, Read, ReactState, Write, ReadWrite)

type ReactEff e = ( props :: ReactProps, refs :: ReactRefs (read :: Read), state :: ReactState ReadWrite | e)

navMessage :: forall props. { msg :: Nullable String | props } -> ReactElement
navMessage props = case msg of
                     Nothing -> D.text ""
                     Just msg' -> ui msg'
  where
    msg = toMaybe props.msg
    ui :: String -> ReactElement
    ui str = D.div [P.className "row sub-header"] [D.div [P.className "col-xs-12 center-block text-center"] [D.p [] [D.text str]]]

logout :: forall props eff. { logout :: Eff (ReactEff eff) Unit | props } -> ReactElement
logout props = D.li [] [D.a [P.style {color:"white"}, P.className "hover", P.onClick (\_ -> props.logout)] [D.text "LOGOUT"]]

menu :: forall props eff. { menu :: Boolean, logout :: Eff (ReactEff eff) Unit | props } -> ReactElement
menu props = D.ul [P.className $ classNames [tclass "nav navbar-nav navbar-right", Tuple "collapse" menu']] [logout props]
  where
    menu' = not props.menu

menuContainer :: forall props eff. { menu :: Boolean, logout :: Eff (ReactEff eff) Unit | props } -> ReactElement
menuContainer props = D.div [P._id "bs-example-navbar-collapse-1", P.className "collapse navbar-collapse"] [menu props]

navButton props = D.button [ P._data {toggle: "collapse", target: "#bs-example-navbar-collapse-1"}, P.aria { expanded: "false"}, P.style {position: "absolute", right: 0}, P.className (classNames [tclass "navbar-toggle collapsed", Tuple "collapse" (not props.menu)]) ] 
                  [ D.span [P.className "sr-only"] [D.text "Toggle navigation"], D.span [P.className "icon-bar"] [], D.span [P.className "icon-bar"] [], D.span [P.className "icon-bar"] []]

navBrand props = D.a [P.className "navbar-brand", P.onClick (\_ -> props.routeToUrl "/" )] [D.img [P.src "/static/images/logo.png"] []]

navClickHandler :: forall t14 t15.
  { splashShown :: Boolean
  , goBack :: Unit -> t15
  , routeToUrl :: String -> t15
  | t14
  } -> t15
navClickHandler props = if props.splashShown
                        then props.goBack unit
                        else props.routeToUrl "/" 

navRoute props = D.span [P.className (classNames [tclass "glyphicon glyphicon-menu-left navbar-back", Tuple "collapse" (not props.backButton)]), P.aria {hidden:true}, P.onClick (\_ -> navClickHandler props)] []

navBarRE props = D.nav [P.className "navbar navbar-default navbar-fixed-top"] 
                 [D.div [P.className "container"] [D.div [P.className "navbar-header"] [navButton props, navRoute props, navBrand props], menuContainer props, navMessage props]]
