# Data Sources: Ghost Rovers

Every fact and image traces back to a NASA source. Status shows what is verified.

## NASA data

| Source | What we use | How we use it | Status |
|---|---|---|---|
| NASA Space Science Data Coordinated Archive (NSSDCA), nssdc.gsfc.nasa.gov | Mission records for each machine: landing date, site, what it did, current status | Every fact on every story card is checked against this. Each ghost links to its own record | To do: Block 3 fact-check |
| NASA Goddard Scientific Visualization Studio, CGI Moon Kit (svs.gsfc.nasa.gov/4720), LRO color map lroc_color_2k.jpg | Global color map of the Moon from the Lunar Reconnaissance Orbiter | Reprojected into a near-side view by tools/render_moon.py; landing sites placed by latitude and longitude | In use |
| NASA Image and Video Library (images.nasa.gov) | Hardware photos | Shown unmodified (resized) on story cards, credited by NASA ID | 2 of 6 in use |

## Photos

| NASA ID | Shows | Used for | Status |
|---|---|---|---|
| as11-44-6581 | Apollo 11 lunar module Eagle in lunar orbit | Eagle's Launch Pad | In assets |
| as12-48-7121 | Surveyor 3 on the Moon, photographed by Apollo 12 | Surveyor 3 | In assets |
| as11-37-5551 | Apollo 11 experiments package with the laser reflector, from the LM window | Laser Mirror | Still to save |
| as12-47-6918 | Parts of the Apollo 12 ALSEP | Moonquake Station | Still to save |
| as15-88-11901 | Apollo 15 Lunar Roving Vehicle | Apollo 15 Rover | Still to save |
| as17-137-20979 | Apollo 17 Lunar Roving Vehicle close-up | Apollo 17 Rover | Still to save |

All photos were chosen to show hardware only, with no people in frame.

## Landing site coordinates (draft, verify in Block 3)

| Site | Latitude | Longitude | Ghosts |
|---|---|---|---|
| Apollo 11, Sea of Tranquility | 0.674 N | 23.473 E | Laser Mirror, Eagle's Launch Pad |
| Apollo 12 / Surveyor 3, Ocean of Storms | 3.012 S | 23.422 W | Surveyor 3, Moonquake Station |
| Apollo 15, Hadley-Apennine | 26.132 N | 3.634 E | Apollo 15 Rover |
| Apollo 17, Taurus-Littrow | 20.191 N | 30.772 E | Apollo 17 Rover |

## Other resources

| Resource | Use | License |
|---|---|---|
| Google Fonts: IBM Plex Mono, Archivo Narrow, VT323, Special Elite | Type | SIL Open Font License |
| Python, NumPy, Pillow | Moon render script | Open source |

NASA content is generally not copyrighted. Credit line used on the site: "Images and data: NASA." No NASA logos or insignia are used.
