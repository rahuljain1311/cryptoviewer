module SummaryBody (summaryBody)  where

import Prelude
import React.DOM as D
import React.DOM.Props as P
import React (ReactElement)
import Data.Array (mapWithIndex)

summaryBody :: forall props. { whatToExpectNow :: Array String | props } -> ReactElement
summaryBody props = D.div [P.className "container flu-expect"] [expectHeader, expectDiv props, questionDiv]

expectHeader :: ReactElement
expectHeader = D.div [ P.className "row"] [D.div [P.className "col-xs-12 text-center flu-header"] [D.p [] [ D.text "WHAT TO EXPECT NOW"]]]

expectDiv :: forall props. { whatToExpectNow :: Array String | props } -> ReactElement
expectDiv props = D.div [P.className "row info"] [D.div [P.className "col-xs-12"] [D.ul [] lis]]
  where
    lis = mapWithIndex (\key x -> D.li [P.key (show key)] [D.text x]) props.whatToExpectNow

questionDiv :: ReactElement
questionDiv = D.div [P.className "row"] [D.div [P.className "col-xs-12 center-block text-center"] [btn1, btn2]]
  where
    btn1 = D.button [P.className "btn btn-primary"] [D.img [P.src "/static/images/fluQuestion.png", P.style {marginRight: "2px"}] [], D.text "Ask Question"]
    btn2 = D.button [P.className "btn btn-primary"] [D.img [P.src "/static/images/fluFind.png", P.style {marginTop: "-2px", marginRight: "3px"}] [], D.text "Nurse Hotline"]
    
