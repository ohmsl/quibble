package main

import (
	"log"
	"net/http"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	pbApp := pocketbase.New()

	pbApp.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.GET("/hello", func(e *core.RequestEvent) error {
			name := e.Request.PathValue("name")

			return e.String(http.StatusOK, "Hello "+name)
		})

		return se.Next()
	})

	pbApp.OnBootstrap().BindFunc(func(e *core.BootstrapEvent) error {
		err := e.Next()
		if err != nil {
			return err
		}

		// do some bootstrapping here

		return nil
	})

	pbApp.OnRecordCreateRequest("*").BindFunc(func(e *core.RecordRequestEvent) error {
		auth := e.Auth
		if auth != nil {
			userId := auth.Id
			orgId := auth.GetString("org_id")

			collection := e.Record.Collection()

			userIdField := collection.Fields.GetByName("user_id")
			if userIdField != nil {
				e.Record.Set("user_id", userId)
			}

			orgIdField := collection.Fields.GetByName("org_id")
			if orgIdField != nil {
				e.Record.Set("org_id", orgId)
			}
		}
		return nil
	})

	// Must start PocketBase before doing any queries
	err := pbApp.Start()
	if err != nil {
		log.Fatalf("Failed to start PocketBase: %v", err)
	}
}
