module Native where

import Control.Monad.Eff (Eff, kind Effect)
import Control.Monad.Eff.Uncurried
import Data.Show (class Show, show)
import Data.Unit (Unit)
import Prelude
import Data.Maybe
import React (ReactClass)
import Unsafe.Coerce (unsafeCoerce)

foreign import push
  :: forall eff obj
   . String
  -> Eff ( | eff) { | obj }

foreign import round :: Number -> Int -> Number

foreign import isOpen :: forall eff props. Array { startTime :: Int, endTime :: Int, day :: String | props } ->  Boolean

foreign import timeString :: String -> String -> String

foreign import changeLocImpl :: forall eff. EffFn1 ( | eff ) String Unit

foreign import windowOpenImpl :: forall eff. EffFn1 ( | eff ) String Unit

foreign import modalOpenImpl :: forall eff. EffFn1 ( | eff ) String Unit

foreign import getRouteImpl :: forall eff. EffFn1 ( | eff ) String String

changeLoc :: forall eff. String -> Eff ( | eff ) Unit
changeLoc = runEffFn1 changeLocImpl

windowOpen :: forall eff. String -> Eff ( | eff ) Unit
windowOpen = runEffFn1 windowOpenImpl

modalOpen :: forall eff. String -> Eff ( | eff ) Unit
modalOpen = runEffFn1 modalOpenImpl

getRouteValue :: String -> String
getRouteValue = unsafeCoerce $ runEffFn1 getRouteImpl






