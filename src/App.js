import React from "react";
import { Suspense } from "react";
import { useEffect } from "react";
import {
  StaticGrid,
  Subscription,
  LightstreamerClient,
} from "lightstreamer-client-web";

function App() {
  useEffect(() => {
    var client = new LightstreamerClient(
      "http://push.lightstreamer.com/",
      "HELLOWORLD"
    );
    client.connect();

    var grid = new StaticGrid("hellogrid", true);

    var subscription = new Subscription(
      "MERGE",
      grid.extractItemList(),
      grid.extractFieldList()
    );
    subscription.addListener(grid);

    client.subscribe(subscription);
  }, []);
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <div
          data-source="lightstreamer"
          data-grid="hellogrid"
          data-item="greetings"
          data-field="message"
        >
          loading...
        </div>
        <div
          data-source="lightstreamer"
          data-grid="hellogrid"
          data-item="greetings"
          data-field="timestamp"
        >
          loading...
        </div>
      </Suspense>
    </div>
  );
}

export default App;
