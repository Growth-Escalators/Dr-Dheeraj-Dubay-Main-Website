"use client";

import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import Link from "next/link";

export default function GoogleMaps() {
  const position1 = { lat: 26.903488202765963, lng: 75.72921788230423 };
  // Vidhyadhar Nagar clinic (matches lib/clinic-info.ts). Was pinned in
  // Jagatpura, ~17 km from the address shown next to it.
  const position2 = { lat: 26.9633, lng: 75.7693 };

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <div className="md:mb-64">
      <APIProvider apiKey="AIzaSyBAi8dE58UCX0blqwVUKRv8z7Yw0zGPYDs">
        <h2 className=" text-center my-8  mx-8 font-extrabold text-gray-700 text-xl lg:text-3xl xl:text-6xl leading-relaxed dark:text-gray-300">
          We are here in <span className="text-primary">Jaipur</span> at two
          different Locations
        </h2>

        <div className="flex flex-col md:flex-row">
          <div
            className="mx-auto my-4 md:my-8 w-[90%]  md:w-[40%]"
            style={{ height: "60vh" }}
          >
            <h2 className=" text-center my-8  mx-8  text-gray-700 text-xl lg:text-2xl leading-relaxed dark:text-gray-300">
              <span className="text-primary font-extrabold lg:text-4xl">Shalby Hospital </span>{" "}
              <br /> Ajmer Expressway 200 Feet Bypass Road, near Gandhi Path,
              Chitrakoot Sector 3, Vaishali Nagar, Jaipur, Rajasthan 302021
            </h2>
            <Map zoom={12} center={position1} mapId="2356584220fb1eb7">
              <AdvancedMarker
                position={position1}
                onClick={() => {
                  setOpen1(true);
                }}
              >
                <Pin
                  background={"red"}
                  borderColor={"black"}
                  glyphColor={"black"}
                />
              </AdvancedMarker>

              {open1 && (
                <InfoWindow
                  position={position1}
                  onCloseClick={() => setOpen1(false)}
                >
                  <p className=" text-sm font-bold">Dr. Dheeraj Dubay</p>
                  <p className="pt-1 w-40 mx-auto">
                    Shalby Hospital: Ajmer Expressway 200 Feet Bypass Road, near
                    Gandhi Path, Chitrakoot Sector 3, Vaishali Nagar, Jaipur,
                    Rajasthan 302021
                  </p>
                  <Link
                    target="_blank"
                    href="https://maps.app.goo.gl/R9RLVhxStePChnRw8"
                  >
                    <p className="pt-1 w-40 mx-auto text-blue-700 font-bold underline">
                      View on Google Maps
                    </p>
                  </Link>
                </InfoWindow>
              )}
            </Map>
          </div>

          <div
            className="mx-auto w-[90%]  md:w-[40%] my-64 md:my-8"
            style={{ height: "60vh" }}
          >
            <h2 className=" text-center my-8  mx-8  text-gray-700 text-xl lg:text-2xl leading-relaxed dark:text-gray-300">
              <span className="text-primary font-extrabold lg:text-4xl">
                Dr. Dubay Hip & Knee clinic{" "}
              </span>{" "}
              <br /> 297, Gali Number 6, Kusum Vihar, Vidhyadhar Nagar,
              Jaipur, Rajasthan 302017
            </h2>
            <Map zoom={12} center={position2} mapId="2356584220fb1eb7">
              <AdvancedMarker
                position={position2}
                onClick={() => {
                  setOpen2(true);
                }}
              >
                <Pin
                  background={"red"}
                  borderColor={"black"}
                  glyphColor={"black"}
                />
              </AdvancedMarker>

              {open2 && (
                <InfoWindow
                  position={position2}
                  onCloseClick={() => setOpen2(false)}
                >
                  <p className=" text-sm font-bold">
                    Dr. Dubay Hip & Knee clinic
                  </p>
                  <p className="pt-1 w-40 mx-auto">
                    297, Gali Number 6, Kusum Vihar, Vidhyadhar Nagar,
                    Jagatpura, Jaipur, Rajasthan 302017
                  </p>
                  <Link
                    target="_blank"
                    href="https://maps.app.goo.gl/kAMVprRz6AkWpjESA"
                  >
                    <p className="pt-1 w-40 mx-auto text-blue-700 font-bold underline">
                      View on Google Maps
                    </p>
                  </Link>
                </InfoWindow>
              )}
            </Map>
          </div>
        </div>
      </APIProvider>
    </div>
  );
}
