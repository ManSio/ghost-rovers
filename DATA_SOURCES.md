# Data Sources: Ghost Rovers

Every fact and image traces back to a NASA source. Status shows what is verified.

## NASA data

| Source | What we use | How we use it | Status |
|---|---|---|---|
| NASA Space Science Data Coordinated Archive (NSSDCA), nssdc.gsfc.nasa.gov | Mission records for each machine: landing date, site, what it did, current status | Every fact on every story card is checked against this. Each ghost links to its own record | Done Nov 14, 2026. Moon records: 1969-059C, 1967-035A, 1969-099C, 1971-063C, 1972-096C (`docs/FACT_CHECK.md`). Mars records: 1975-075C, 1975-083C, 1996-068A, 2003-027A, 2003-032A, 2018-042A (`docs/FACT_CHECK_MARS.md`) |
| NASA Goddard Scientific Visualization Studio, CGI Moon Kit (svs.gsfc.nasa.gov/4720), LRO color map lroc_color_2k.jpg | Global color map of the Moon from the Lunar Reconnaissance Orbiter | Used on the 3D Moon globe and reprojected into a near-side view by tools/render_moon.py; landing sites placed by latitude and longitude | In use |
| NASA 3D Resources, Mars Image Texture (https://science.nasa.gov/3d-resources/mars/, https://assets.science.nasa.gov/content/dam/science/cds/3d/resources/image/mars/Mars.tif), Credit: NASA/Jet Propulsion Laboratory & Caltech (from Viking images processed at the USGS) | Global equirectangular color map of Mars (`assets/nasa/mars_2k.jpg`, 2048×1024) | Used on the 3D Mars globe; verified with Olympus Mons alignment check (18.65 N, 133.8 W); landing sites placed by latitude and longitude | In use |
| NASA Image and Video Library (images.nasa.gov) | Hardware photos | Shown unmodified (resized; Spirit's fisheye self-portrait cropped to a square around the rover deck) on story cards, credited by NASA ID | 6 of 6 Moon and 6 of 6 Mars in use |

## Photos

| NASA ID | Source URL | Shows | Used for | Status |
|---|---|---|---|---|
| as11-44-6581 | https://images.nasa.gov/details/as11-44-6581 | Apollo 11 lunar module Eagle in lunar orbit | Eagle's Launch Pad | In assets (`assets/nasa/eagle_800.jpg`) |
| as12-48-7121 | https://images.nasa.gov/details/as12-48-7121 | Surveyor 3 on the Moon, photographed by Apollo 12 | Surveyor 3 | In assets (`assets/nasa/surveyor3_800.jpg`) |
| as11-37-5551 | https://images.nasa.gov/details/as11-37-5551 | Apollo 11 experiments package with the laser reflector, from the LM window | Laser Mirror | In assets (`assets/nasa/as11-37-5551_800.jpg`) |
| as12-47-6918 | https://images.nasa.gov/details/as12-47-6918 | Parts of the Apollo 12 ALSEP | Moonquake Station | In assets (`assets/nasa/as12-47-6918_800.jpg`) |
| as15-88-11901 | https://images.nasa.gov/details/as15-88-11901 | Apollo 15 Lunar Roving Vehicle | Apollo 15 Rover | In assets (`assets/nasa/as15-88-11901_800.jpg`) |
| as17-146-22367 | https://images.nasa.gov/details/as17-146-22367 | Apollo 17 Lunar Roving Vehicle parked at its final resting place at Taurus-Littrow | Apollo 17 Rover | In assets (`assets/nasa/as17-146-22367_800.jpg`) |
| PIA00572 | https://images.nasa.gov/details/PIA00572 | Viking 1 lander deck in foreground and boulder "Big Joe" on Chryse Planitia | Viking 1 Lander | In assets (`assets/nasa/pia00572_800.jpg`) |
| PIA00571 | https://images.nasa.gov/details/PIA00571 | Viking 2 lander foreground and water-ice frost on Utopia Planitia | Viking 2 Lander | In assets (`assets/nasa/pia00571_800.jpg`) |
| PIA01122 | https://images.nasa.gov/details/PIA01122 | Sojourner rover beside "Yogi" rock in Ares Vallis, photographed by Mars Pathfinder | Sojourner Rover | In assets (`assets/nasa/pia01122_800.jpg`) |
| PIA16442 | https://images.nasa.gov/details/PIA16442 | Spirit rover Pancam self-portrait in Gusev Crater (cropped to square around rover deck) | Spirit Rover | In assets (`assets/nasa/pia16442_800.jpg`) |
| PIA18079 | https://images.nasa.gov/details/PIA18079 | Opportunity rover Pancam self-portrait after wind-cleaning event on Endeavour Crater rim | Opportunity Rover | In assets (`assets/nasa/pia18079_800.jpg`) |
| PIA25287 | https://images.nasa.gov/details/PIA25287 | InSight lander's final selfie on Mars (Sol 1211), solar panels covered in dust | InSight Lander | In assets (`assets/nasa/pia25287_800.jpg`) |

All photos were chosen to show hardware only, with no people in frame.

## Landing site coordinates (verified in Block 3, NSSDCA LRO-derived)

| Site | Latitude | Longitude | Ghosts |
|---|---|---|---|
| Apollo 11, Sea of Tranquility | 0.67416 N | 23.47314 E | Laser Mirror, Eagle's Launch Pad |
| Apollo 12 / Surveyor 3, Ocean of Storms | 3.0128 S (Surveyor 3: 3.0162 S) | 23.4219 W (Surveyor 3: 23.418 W) | Surveyor 3, Moonquake Station |
| Apollo 15, Hadley-Apennine | 26.13239 N | 3.63330 E | Apollo 15 Rover |
| Apollo 17, Taurus-Littrow | 20.1911 N | 30.7723 E | Apollo 17 Rover |

## Mars landing site coordinates (verified in Block 7, NSSDCA)

| Site | Latitude | Longitude | Ghosts |
|---|---|---|---|
| Viking 1, Chryse Planitia | 22.27 N | 47.95 W (-47.95 E) | Viking 1 Lander |
| Viking 2, Utopia Planitia | 47.6673 N | 134.2809 E | Viking 2 Lander |
| Mars Pathfinder, Ares Vallis | 19.33 N | 33.55 W (-33.55 E) | Sojourner Rover |
| Spirit (MER-A), Gusev Crater | 14.572 S (-14.572 N) | 175.478 E | Spirit Rover |
| Opportunity (MER-B), Meridiani Planum | 1.946 S (-1.946 N) | 5.527 W (-5.527 E) | Opportunity Rover |
| InSight, Elysium Planitia | 4.502 N | 135.623 E | InSight Lander |

## Other resources

| Resource | Use | License |
|---|---|---|
| Google Fonts: IBM Plex Mono, Archivo Narrow, VT323, Special Elite | Type | SIL Open Font License |
| Python, NumPy, Pillow | Moon render script | Open source |

NASA content is generally not copyrighted. Credit line used on the site: "Images and data: NASA." No NASA logos or insignia are used.
