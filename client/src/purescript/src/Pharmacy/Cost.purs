module Pharmacy.Cost (cost) where

import Prelude
import React.DOM as D
import React.DOM.Props as P
import React (ReactElement)
import Utils.Helpers (ire)
import Data.Maybe
import Data.Nullable (toMaybe, Nullable)

costDiv :: forall props. { cost :: Nullable { unit :: String, min :: Int, max :: Int | props }  | props } -> ReactElement
costDiv props = case cost' of
                 Nothing -> ire
                 Just cost'' -> ui cost''
  where
    cost' = toMaybe props.cost
    ui cost'' = D.span [P.className (costColor cost''.max), P.style {fontSize: "large", fontWeight: "bold"}] [D.text (cost''.unit <> show (cost''.min) <> "-" <> show (cost''.max) <> " ")]

cost :: forall props. { cost :: Nullable { unit :: String, min :: Int, max :: Int | props }  | props } -> ReactElement
cost props = case cost' of
               Nothing -> ire
               Just cost'' -> D.div [P.className "row", P.style {marginTop: "5px", marginButton: "5px"}] [D.div [P.className "col-xs-12"] [costDiv props, D.text "Avg. cost"]]
  where
    cost' = toMaybe props.cost

costColor :: Int -> String
costColor cost | cost <= 50 = "time-lower"
               | cost <= 100 = "time-higher"
               | otherwise = "time-danger"
