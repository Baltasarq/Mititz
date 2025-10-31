// Mititz (c) 2025 Baltasar MIT License <baltasrq@gmail.com>
/*
	generado por FI.JS@txtMap, v0.1/ v0.6 20140612
	Wed Oct 29 16:28:08 2025

*/


// ===================================================================== Places
const locMititzSurroundings = ctrl.places.crea(
	"Alrededores de Mititz",
	[ "alrededores" ],
	"^{Caminando por el arcén de la carretera, pronto pierdes \
	 la esperanza de cruzarte con otro coche, tropezarte con otra gente... \
	 Las altas horas de la noche, y la alta humedad, \
	 que levanta volutas de bruma, provocan una sensación de desolación. \
	 El cartel a Mititz está aquí, pero el desvío se te antoja ominoso \
	 y poco amigable, a través de un oscuro bosque. \
	 Las buenas gentes estarán durmiendo, y con las no tan buenas... \
	 preferirías no encontrarte. Además, siguiendo las buenas costumbres \
	 de este país, el indicador no informa de distancias, \
	 y el pueblo no se adivina desde aquí. }</p><p>\
	 La ${carretera, ex carretera} ${continua, e} interminable, \
	 un ${desvío, ex desvio} de una carreterita agrietada se interna en \
	 el ${bosque, ex bosque} de uno de sus márgenes. \
	 El desvío está señalizado mediante un ${cartel, ex cartel}.",
	function() {
	    this.setExit( "este", locLongRoadSegment );
        this.pic = "res/road-detour.jpg";

        const objDesvio = ctrl.creaObj(
            "Desvío",
            [ "desvio", "carreterita" ],
            "Se ${interna, n} en el bosque de uno de sus márgenes.",
            this,
            Ent.Scenery,
        );

        this.preGo = function() {
            if ( parser.sentence.term1 == "norte" ) {
                player.say( "Me parece más probable encontrar ayuda \
                                 en la gasolinera." );
                return "Te preparas mentalmente para seguir caminando...";
            }

            if ( parser.sentence.term1 == "este" ) {
                return goAction.exe( parser.sentence );
            }

            return "No es posible.";
        };

        const objFinal = ctrl.creaObj(
            "final",
            [],
            "El final se acerca. Es el fin",
            this,
            Ent.Scenery,
            function() {
                this.preExamine = function() {
                    ctrl.endGame( "Corres, corres sin mirar atrás. \
                                   Huyes tan rápido como puedes, \
                                   intentando escapar de esta locura.",
                                   "res/road.jpg" );
                };
            }
        );
            
        this.preLook = function() {
            let toret = this.desc;

            if ( objBar.timesUsed > 0 ) {
                this.preGo = function() {
                    return "Solo quieres ${huir, ex final}, huir...";
                };
                
                this.doEachTurn = function() {
                    ctrl.print( "Sientes la necesidad de correr... \
                                ¡${huir, ex final}!, debes huir..." );
                };

                ctrl.print( "Tras descubrir un pasadizo en la tumba, \
                             te lanzaste a correr sin freno, atravesando \
                             el bosque y llegando, de nuevo, \
                             a la carretera." );
                
                ctrl.print( "Corres, y corres, tropezando cada pocas \
                             zancadas, ¡debes ${huir, ex final}!" );
            }

            return toret;
        };

        this.creaScenery(
            "bosque",
            [ "arboles" ],
            "Denso y oscuro. Los árboles son muy altos en este punto."
        );

        this.creaScenery(
            "carretera",
            [],
            "Muy oscura, debido al ${bosque, ex bosque}, \
             que más que flanquearla, parece querer invadirla."
        );

        this.creaScenery(
            "cartel",
            [ "letrero" ],
            "Se lee \"Mititz\" en su interior."
        );
	}
);

const locVillageStreet = ctrl.places.crea(
	"Calle del pueblo",
	[ "calle" ],
	"^{Las horripilantes mujeres te llevan a empujones por la calle. \
	 Las casas parecen elevarse, oscuras, a los lados de \
	 la estrecha calle. } Todos las ${puertas, ex puertas} \
	 y ${ventanas, ex ventanas} están cerradas a cal y canto. \
	 La calle se alarga en ambos sentidos, hacia el ${bosque, ex bosque} \
	 y hacia el ${centro del pueblo, ex centro}.",
	function() {
	    this.pic = "res/village_street.jpg";
        this.setExit( "oeste", locVillageSquare );

        this.creaScenery(
            "bosque",
            [ "arboles" ],
            "El bosque comienza muy cerca del final de la calle. \
             Por desgracia, la fuerza de los golpes y el agarre \
             de las mujeres te impide retroceder por mucho que lo intentes. "
        );

        this.creaScenery(
            "centro",
            [],
            "La calle se adentra en ${el centro, o} del pueblo."
        );

        this.creaScenery(
            "calle",
            [],
            "Desde aquí permite alcanzar el ${bosque, e}."
        );

        this.creaScenery(
            "puertas",
            [ "portales", "portal", "puerta" ],
            "Cerradas a cal y canto."
        );

        this.creaScenery(
            "ventanas",
            [ "ventana" ],
            "Cerradas a cal y punto."
        );
	}
);

const locPath = ctrl.places.crea(
	"Camino",
	[ "camino" ],
	"^{El camino se interna cada vez más, mientras el bosque \
	 se vuelve cada vez más denso a tu alrededor. Apartas ramas y hojas \
	 lejos de ti, mientras evitas arbustos que hacen que el camino \
	 se transforme en sendero. En ocasiones, miras hacia atrás \
	 como temiendo que el sendero tras tu paso haya desaparecido \
	 en un golpe de tenebrosa magia.<br/>}\
	 A través de la vegetación, puedes seguir internándote en el bosque \
	 por el ${sendero, ex sendero} desde la ${carretera, s}.",
	function() {
	    this.pic = "res/path_beginning.jpg";
	    this.setExit( "norte", locForestClear );
        this.setExit( "sur", locLongRoadSegment );

        this.creaScenery(
            "sendero",
            [ "camino" ],
            "Cada vez más estrecho, cada vez más adentro del ${bosque, n}."
        );

        this.preGo = function() {
            if ( parser.sentence.term1 == "sur" ) {
                player.say( "En realidad, estoy intrigado por la visión." );
                return "Apartas una rama junto a tu cara...";
            }

            if ( parser.sentence.term1 == "norte" ) {
                return goAction.exe( parser.sentence );
            }

            return "No es posible.";
        };
	}
);

const locRoadPre = ctrl.places.crea(
    "Carretera",
    [ "carretera" ],
    "^{De pronto, el motor empieza a toser. \
	 Una punzada asciende en tu interior. \
	 Tratas de acelerarlo para evitar el inevitable desenlace, \
	 pero sabes que no servirá de nada. \
	 La reparación largo tiempo pospuesta lo hubiera evitado, \
	 pero hay otras, y no pocas, necesidades en tu vida.</p><p>\
	 Con un largo suspiro, acercas el coche y lo detienes en el arcén, \
	 parte sobre el asfalto, y la otra sobre la hierba, \
	 aprovechando los últimos estertores del motor. }\
	 No gritas, aunque lo deseas (pero sí gritas); no golpeas el volante, \
	 pues sabes que no serviría de nada (pero sí lo golpeas). \
	 Solo te permites otro largo, prolongado, ${suspiro, e}.",
	 function() {
	    this.pic = "res/road.jpg";
	    this.setExit( "este", locRoadPre2 );
	 }
 );

 const locRoadPre2 = ctrl.places.crea(
    "Carretera",
    [ "carretera" ],
    "^{Compruebas el móvil. Sin apenas batería (como siempre), \
	 pero más importante, sin cobertura en esta zona de montaña. \
	 ¿Cuándo viste la última gasolinera? \
	 Crees recordar que fue como a cinco kilómetros más atrás, \
	 pasado de largo aquel reciente desvío, \
	 con un cartel con aquel nombre... que llamó tu atención... \
	 para un pueblo: Mititz.</p><p>}\
	 Debes ${salir, e} del coche: no queda otro remedio.",
	 function() {
	    this.pic = "res/road.jpg";
	    this.setExit( "este", locRoad );
	 }
 );

const locRoad = ctrl.places.crea(
	"Carretera",
	[ "carretera" ],
	"El ${asfalto, ex asfalto} \
	 parece no tener fin, flanqueado por un denso ${bosque, ex bosque}. \
	 Aún así, sabes que debes ${retroceder, e} para encontrar la gasolinera, \
	 el único sitio donde podrán ayudarte. \
	 Tu ${coche, ex coche} está en el arcén.",
	function() {
	    this.pic = "res/road.jpg";
	    this.setExit( "este", locMititzSurroundings );

	    this.preLook = function() {
	        let toret = this.desc;

	        ctrl.print( "Armándote de paciencia, sales a la fría noche \
	                     y te subes las solapas de la gabardina." );
	        return toret;
	    };

	    this.creaScenery(
            "asfalto",
            [],
            "La carretera no es muy ancha, \
             pero por fortuna está en buenas condiciones." );

        this.creaScenery(
            "bosque",
            [ "arboles" ],
            "Es como si la carretera hubiese atravesado el bosque, \
             y ahora este estuviera vengándose, tratando de cubrir \
             la herida." );

        this.creaScenery(
            "coche",
            [ "buga", "automovil" ],
            "Inútil desde que se paró entre estertores." );
	}
);

const locForestClear = ctrl.places.crea(
	"Claro del bosque",
	[],
	"^{Tras una pequeña lucha con ramas y arbustos que te hacen preguntarte \
	 si has abandonado el sendero, llegas a una zona repentinamente limpia. }\
	 Un ${claro, ex prado} en el ${bosque, ex bosque} se extiende ante ti, \
	 pero lo más llamativo es lo que ves dentro de él, a cierta distancia. \
	 Un ${corro, ex corro} de figuras de blanco destaca en la oscuridad, \
	 acompañado de cánticos que parecen... tétricos.",
	function() {
	    this.pic = "res/forest_clear.jpg";
	    this.setExit( "sur", locPath );

	    this.creaScenery(
            "claro",
            [ "prado" ],
            "Los árboles se despejan hasta un amplio prado... \
             pero lo importante es lo que hay allí... \
             un ${corro, ex corro} de mujeres... bailando."
        );

        this.creaScenery(
            "bosque",
            [ "arboles" ],
            "El bosque se vuelve menos denso \
             hasta un amplio ${prado, ex prado}."
        );

        this.creaScenery(
            "corro",
            [ "mujeres", "figuras", "blancas", "blanco" ],
            "Aunque no puedes reconocer sus facciones, \
             se trata de un grupo de mujeres que parecen bailar \
             al tétrico ritmo de unos cánticos realizados por ellas mismas. \
             Esta música te parece tétrica en primera instancia, \
             pero te produce miedo y angustia cuando te paras a escucharla \
             con detenimiento, pese a no entender la lengua \
             de las voces de la composición."
        );
        
        this.preLook = function() {
            const TORET = this.desc;

            if ( this.getTimesExamined() == 0 ) {
                ctrl.setAlarm( 3, function() {
                    pnjStalker.moveTo( locForestClear );
                    ctrl.places.doDesc();
                    ctrl.print( "${Alguien, ex acosadora} se acerca..." );
                });
            }
            
            return TORET;
        };
	}
);

const locCapture = ctrl.places.crea(
    "Claro del bosque",
    [ "claro", "bosque" ],
    "Te giras, asustado, cuando adviertes una presencia cerca de ti. \
     ¡ES UNA DE ELLAS! Una ${mujer, ex mujer} vestida de blanco, \
     como las mujeres del corro, de pie a tu lado, te mira amenzadoramente.",
    function () {
        this.pic = "res/spooky_woman_in_white.jpg";

        this.preLook = function() {
            let toret = this.desc;

            pnjStalker.moveTo( this );
            pnjStalker.preExamine = function() {
                this.moveTo( ctrl.places.limbo );
                return ctrl.goto( locPathToVillage );
            };
            player.say( "Yo... lo siento... no pretendía..." );
            ctrl.print( "La mujer emite un grito obsceno, gutural, \
                         que hacen que las que bailaban en el corro \
                         miren ahora hacia ti, gritando a su vez, \
                         en tu horror adivinas que con rabia." );
            return toret;
        };
    }
);

const locPathToVillage = ctrl.places.crea(
    "Camino al pueblo",
    [ "camino", "pueblo" ],
    "^{No eres precisamente un enclenque. Las tardes de los domingos \
       en el gimnasio han dado sus frutos. Sin embargo, \
       las horripilantes mujeres en derredor tuyo, sin dejar de proferir \
       esos tétricos gritos, te llevan en volandas.</p><p>}\
       Aterrorizado, eres llevado a empellones por el camino, \
       hacia un ${pueblo, o} en lontananza.",
    function() {
        this.pic = "res/path.jpg";
        this.setExit( "oeste", locVillageStreet );
    }
);

const locCrypt = ctrl.places.crea(
	"Cripta",
	[ "cripta" ],
	"^{Caes a trompicones por una escalera, hasta aterrizar \
	 en un suelo pétreo. Te alivia estar libre de esas terribles mujeres, \
	 pero al mismo tiempo te das cuenta, casi con el mismo horror, \
	 de que estás atrapado. }\
	 Este lugar es más parecido a una cueva que a una típica cripta \
	 bajo la iglesia. En su centro, puedes ver \
	 una gran ${figura, ex figura} que preside el subterráneo. \
	 Unas ${escaleras, ex escaleras} permiten ascender al nivel del suelo. \
	 A los lados, puedes ver varios ${sepulcros, ex sepulcros}.",
	function() {
	    this.pic = "res/crypt.jpg";
	}
);

const objSymbols = ctrl.creaObj(
    "Símbolos",
    [ "simbolos", "simbolo", "inscripcion", "inscripciones" ],
    "Varias tumbas con variados símbolos.",
    locCrypt,
    Ent.Scenery,
    function() {
        this.tombs = [
            "Petrus", "Fideus", "Paulus", 
            "Pompeius", "Salustius", "Iulius" ];
        this.symbols = [
            "un cuervo atravesado por una flecha",
            "un puño blandiendo una espada",
            "un toro atravesado por una espada",
            "una cabra sobre una media luna",
            "tres estrellas bajo una luna llena",
            "una espiga de trigo cruzada con una guadaña" ];

        this.shuffle = function()
        {
            let symbls = this.symbols;

            // Shuffle tombs
            for (let i = symbls.length - 1; i > 0; --i) {
                const j = ctrl.rnd( 0, i + 1 );
                [symbls[ i ], symbls[ j ]] = [symbls[ j ], symbls[ i ]];
            }

            // Find the correct one
            for (let i = 0; i < this.symbols.length; ++i) {
                if ( this.symbols[ i ].indexOf( "toro" ) > -1 ) {
                    this.escapeTomb = i;
                }
            }
        }

        this.shuffle();

        this.preExamine = function() {
            let toret = this.desc + ".";
            
            if ( objStatue.isClean ) {
                let delim = "";
                
                toret += " con inscripiones bajo ellas: ";
                
                for(let i = 0; i < this.tombs.length; ++i) {
                    toret += delim;
                    toret += "la de " + this.tombs[ i ]
                                + ", con un símbolo de " + this.symbols[ i ];
                    delim = "; ";
                }
            }

            return toret;
        }
    }
);

const objTombs = ctrl.creaObj(
    "sepulcros",
    [ "sepulcro", "tumbas", "tumba" ],
    "Varios sepulcros se encuentran a ambos lados. \
     Hay ${inscripciones y símbolos, ex simbolos} en ellos.",
    locCrypt,
    Ent.Scenery,
    function() {
        this.prePush = function() {
            return "Haces palanca hasta poder ver un resquicio de \
                    unos huesos humanos. Vuelves a empujar la tapa. \
                    Nada útil aquí.";
        };

        this.preEnter = function() {
            let toret = "Pero... ¿cómo?";

            if ( objStatue.isClean
              && objSymbols.getTimesExamined() > 0
              && objBar.timesUsed > 0 )
            {
                toret = ctrl.goto( locMititzSurroundings );
            }

            return toret;
        }
    }
);

const objStairs = ctrl.creaObj(
    "escalera",
    [ "escaleras" ],
    "Una escalera pétrea que asciende a la iglesia, \
     arrancando tras los ${sepulcros, ex sepulcros}.",
     locCrypt,
     Ent.Scenery,
     function() {
        this.preExamine = function() {
            let toret = this.desc;

            if ( ctrl.places.limbo.has( objBar ) ) {
                objBar.moveTo( this.owner );
                ctrl.places.doDesc();
                ctrl.print( "Viste algo tras ellas, en la parte más oscura." );
            }

            return toret;
        };
     }
);

const objBar = ctrl.creaObj(
    "palanca",
    [ "barra" ],
    "Una palanca de hierro macizo.",
    ctrl.places.limbo,
    Ent.Portable,
    function() {
        this.timesUsed = 0;
        this.preExamine = function() {
            let toret = this.desc;

            if ( objStatue.isClean
              && objSymbols.getTimesExamined() > 0 )
            {
                if ( this.timesUsed <= 2 ) {
                    let delim = "";
                    toret += "</p><p>Podrías intentar abrir: ";

                    this.timesUsed += 1;

                    for(let i = 0; i < objSymbols.tombs.length; ++i) {
                        toret += delim;
                        toret += "la tumba de ${" + objSymbols.tombs[ i ];
                        
                        if ( i == objSymbols.escapeTomb ) {
                            toret += ", entra en tumbas";
                        } else {
                            toret += ", empuja tumbas";
                        }
                        
                        toret += "}";
                        delim = ", ";
                    }

                    toret += ".";
                } else {
                    ctrl.endGame( "Sin previo aviso, la trampilla se abre, \
                                   y por ella desciende un hombre... \
                                   un engendro... una bestia... \
                                   Retrocedes, balbucenado... \
                                   Tropiezas. Trastabillas. Caes... \
                                   Todo se nubla, pero entre la bruma \
                                   de tu mente puedes ver como se acerca... \
                                   Es tu final. Es el fin.",
                        "res/devil.png" );
                }
            }

            return toret;
        };
    }
);

const objStatue = ctrl.creaObj(
    "figura",
    [ "estatua" ],
    "Está cubierta de telarañas, musgo, y tierra. \
     No reconoces la representación que intenta realizar.",
    locCrypt,
    Ent.Scenery,
    function () {
        this.isClean = false;

        this.preSearch = function() {
            this.isClean = true;
            objCoat.setWorn( false );
            objCoat.desc = "Ahora está toda sucia y arrugada.";
            this.desc = "MITRA: un guerrero blandiendo una espada.";
            return "Limpias la estatua, descubriendo a un guerrero \
                    con una espada. En su base indica: \"MITRA\". ";
        };
    }
);

const locInsideChurch = ctrl.places.crea(
	"Interior de la iglesia",
	[ "interior de la iglesia" ],
	"^{Las mujeres te empujan hacia el altar... }\
	 La iglesia realmente es muy pequeña. \
	 Unas tres filas de ${bancos, ex bancos} cortos se sitúan \
	 a ambos lados del ${pasillo, ex pasillo} \
	 central hacia el ${altar, ex altar}.",
	function() {
	    this.pic = "res/church_interior.jpg";
        this.setExit( "abajo", locCrypt );

        this.creaScenery(
            "trampilla",
            [],
            "Docenas de manos te ${empujan, abajo} de mala manera \
             a la oscuridad, ahí abajo.",
        );

        this.creaScenery(
            "altar",
            [ "altar" ],
            "El altar es una gran mesa de madera. \
             Cuando unas mujeres la mueven, \
             se descubre una ${trampilla, ex trampilla} que permite descender \
             a algún tipo de subterráneo."
        );

        this.creaScenery(
            "bancos",
            [ "bancos" ],
            "Hay tres hileras de bancos, uno a cada lado \
             del ${pasillo, ex pasillo} por fila."
        );

        this.creaScenery(
            "pasillo",
            [ "corredor" ],
            "El pasillo se adentra por entre los ${bancos, ex bancos} \
             hacia el ${altar, ex altar}."
        );
    }
);

const locLongRoadSegment = ctrl.places.crea(
	"Largo tramo de carretera",
	[],
	"^{Un largo tramo de carretera realiza una curva muy amplia, tan amplia \
	 que casi parecería una recta, se extiende ante ti, \
	 aparentemente sin fin. Apenas puedes ver en la distancia \
	 a dónde se dirige por culpa de la oscuridad reinante, \
	 solo rota a retazos por la luna. Lo único seguro es que \
	 la gasolinera no está cerca, pues el resplandor de sus luces \
	 incluso se adivinaría desde considerable distancia.</p><p>}\
	 La ${carretera, ex carretera} se antoja ${inabarcable, e }, \
	 horadando el ${bosque, ex bosque} en derredor. \
	 Del asfalto parte un ${camino, ex camino} \
	 que se interna en la ominosa oscuridad.",
	function() {
	    this.pic = "res/long_road.jpg";
	    this.setExit( "norte", locPath );

        this.preLook = function() {
            let toret = this.desc;

            ctrl.print( "Un repentino destello blanco surge \
                         en tu visión periférica. \
	                     Giras la cabeza a tiempo para poder ver \
	                     una fugaz figura de blanco \
	                     internarse en el bosque por un camino \
	                     que abandona la carretera." );
            return toret;
        };

        this.preGo = function() {
            if ( parser.sentence.term1 == "este" ) {
                player.say( "No puedo olvidar lo que he visto... \
                             ¿Será alguien que necesita ayuda?" );
                return "Empiezas a caminar, pero te detienes...";
            }

            if ( parser.sentence.term1 == "norte" ) {
                return goAction.exe( parser.sentence );
            }

            return "No es posible.";
        };

        this.creaScenery(
            "camino",
            [ "sendero" ],
            "Un camino que cerca de la carretera parece de gravilla, \
             pero que se va estrechando a medida que se sumerge \
             en el ${bosque, n}."
        );

        this.creaScenery(
            "bosque",
            [ "arboles" ],
            "El bosque se mantiene más alejado aquí, \
             respetando los ${arcenes, ex carretera}."
        );

        this.creaScenery(
            "carretera",
            [],
            "Un tramo muy extenso está a la vista, \
             perdiéndose aún así en ${la distancia, e}."
        );
	}
);

const locVillageSquare = ctrl.places.crea(
	"Plaza del pueblo",
	[ "pueblo" ],
	"^{El grupo de mujeres espectrales te empuja hacia la iglesia. }\
	 Apenas solo dos o tres calles terminan en esta pequeña plaza. \
	 La ${calle, ex calle} más ancha muere en \
	 la pequeña ${explanada, ex explanada} con una ${fuente, ex fuente}, \
	 y al otro lado, la oscura ${iglesia, ex iglesia} del pueblo.",
	function() {
	    this.pic = "res/old_church.jpg";
	    this.setExit( "este", locVillageStreet );
        this.setExit( "oeste", locInsideChurch );

        this.creaScenery(
            "fuente",
            [],
            "No brota agua de ella."
        );

        this.creaScenery(
            "iglesia",
            [],
            "La ${iglesia, o} se alza ominosa sobre la explanada."
        );

        this.creaScenery(
            "calle",
            [],
            "La calle principal lleva en dirección contraria a la iglesia, \
             pero los empellones de las mujeres te impiden avanzar \
             en otra dirección que no sea la ${iglesia, o}."
        );

        this.creaScenery(
            "explanada",
            [ "plaza" ],
            "La ${fuente, ex fuente} y la ${iglesia, ex iglesia} \
             son sus principales reclamos."
        );
	}
);


// ================================================================= Characters

const pnjStalker = ctrl.personas.crea(
    "mujer",
    [ "acosadora" ],
    "Es horripilante.",
    ctrl.places.limbo,
    function() {
        this.preExamine = function() {
            return ctrl.goto( locCapture );
        };

        this.preTalk = function() {
            return this.preExamine();
        };
    }
);

const player = ctrl.personas.crea(
	"Gabriel",
	[ "jugador", "player" ],
	"Vendedor a puerta fría, recorriendo las ciudades \
	 y pueblos para ganar clientes.",
	locRoadPre
);

const objCoat = ctrl.creaObj(
    "gabardina",
    [ "abrigo" ],
    "Impermeable para proteger del frío y de la lluvia.",
    player,
    Ent.Portable,
    function() {
        this.preDisrobe =
        this.preDrop = function() {
            player.say( "En realidad, no quiero quitarme la gabardina." );
        };

        this.preExamine = function() {
            let toret = this.desc;

            if ( objStatue.getTimesExamined() > 0
              && !( objStatue.isClean ) )
            {
                toret += " Podrías usarla para ${limpiar, busca en estatua} \
                            la estatua.";
            }
            
            return toret;
        };
    }
);

const objSuit = ctrl.creaObj(
    "traje",
    [],
    "^{Este traje es el primer paso para tratar de ganarte \
       la confianza de tus clientes.} Es un clásico de tres piezas.",
    player,
    Ent.Portable,
    function() {
        this.preDisrobe =
        this.preDrop = function() {
            player.say( "A veces tengo pensamientos extraños." );
        }
    }
);


// ======================================================================= Boot
ctrl.ini = function()
{
	ctrl.setTitle( "Mititz" );
	ctrl.setIntro( "<p>Avanzas con los ojos entrecerrados, \
	                intentando adivinar tras cada curva \
	                la nueva dirección del asfalto, \
	                gracias a la luz de los faros, \
	                que ayudan lo que pueden en aclarar las tinieblas. \
	                La noche ha caído pronto en este día de invierno, \
	                una noche con luna pero a la vez oscura y ominosa, \
	                incómodo marco por el que discurre \
	                el largo camino a casa.</p>" );
	ctrl.setPic( "res/road.jpg" );
	ctrl.setAuthor( "baltasarq@gmail.com" );
	ctrl.setVersion( "1.0 20251030" );
	ctrl.personas.changePlayer( player );
	ctrl.setRndSeed();
	objSuit.setClothing();
	objCoat.setClothing();
	objSuit.setWorn();
	objCoat.setWorn();
	ctrl.places.setStart( locRoadPre );
}
