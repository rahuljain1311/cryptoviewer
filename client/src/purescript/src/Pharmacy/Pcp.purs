module Pharmacy.Pcp (pcp) where

import Prelude
import React.DOM as D
import React.DOM.Props as P
import React (ReactClass, createClassStateless, ReactElement, createFactory, ReactProps, ReactRefs, Read, ReactState, Write, ReadWrite)
import Utils.Helpers (ire)
import Data.Maybe
import Data.Nullable (toMaybe, Nullable)

clinicName :: forall props. { index :: Int, name :: String | props } -> ReactElement
clinicName props = D.span [ P.className "text-left clinic-name"] [D.text (show props.index <> "." <> props.name )]

freeClinic :: forall props. { isFree :: Nullable Boolean | props } -> ReactElement
freeClinic props = case isFree' of
                     Nothing -> ire
                     Just _ -> ui
  where
    ui = D.span [P.className "pull-right clinic-status"] [D.text freeText]
    isFree' = toMaybe (props.isFree)
    freeText = case (isFree') of
                 Just true -> "FREE"
                 _ -> ""

pcpDiv :: forall props. { isPCP :: Boolean | props } -> ReactElement
pcpDiv props = case props.isPCP of
                 true -> D.span [P.className "pull-right"] [D.text "Your PCP"]
                 false -> ire

pcp :: forall props. { isPCP :: Boolean, index :: Int, name :: String, isFree :: Nullable Boolean | props } -> ReactElement
pcp props = D.div [P.className "col-xs-12"] [D.p [] [clinicName props, freeClinic props, pcpDiv props]]



