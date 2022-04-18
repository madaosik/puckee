import React from "react"

export default function GameDetailEvaluation ()
{
    return (
        <div className="content-row gameDetail-basicInfo">
            <div className="content-inner-row heading">
                Hodnocení
            </div>
            <div className="content-inner-row data">
                {/* Dva radky obsahu*/}
                <div className="d-flex flex-column justify-content-between">
                    {/* Prvni radek se tremi sloupci (cas, organizator, pozvanky*/}
                    <div className="d-flex flex-row justify-content-between">
                        {/* Prvni sloupec (cas, datum) */}
                        <div className="d-flex flex-column justify-content-around">
                            Cas, datum
                        </div>
                        {/* Druhy sloupec (organizatori) */}
                        <div className="d-flex flex-column justify-content-around">
                            Organizatori
                        </div>
                        {/* Treti sloupec (poznamky) */}
                        <div className="d-flex flex-column justify-content-around">
                            Poznamky
                        </div>
                    </div>
                    {/* Druhy radek se tremi sloupci (uroven atd) */}
                    <div className="d-flex flex-row justify-content-between">
                        {/* Prvni sloupec (cas, datum) */}
                        <div className="d-flex flex-column justify-content-around">
                            Ikony
                        </div>
                        {/* Druhy sloupec (organizatori) */}
                        <div className="d-flex flex-column justify-content-around">
                            Prvni sloupec hracu k ohodnoceni
                        </div>
                        {/* Treti sloupec (poznamky) */}
                        <div className="d-flex flex-column justify-content-around">
                            Prvni sloupec hracu k ohodnoceni
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}