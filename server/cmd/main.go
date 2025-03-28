package main

import (
	"log"
	"net/http"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	app := pocketbase.New()

	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.GET("/hello", func(e *core.RequestEvent) error {
			name := e.Request.PathValue("name")

			return e.String(http.StatusOK, "Hello "+name)
		})

		return se.Next()
	})

	app.OnBootstrap().BindFunc(func(e *core.BootstrapEvent) error {
		err := e.Next()
		if err != nil {
			return err
		}

		// do some bootstrapping here

		return nil
	})

	app.OnRecordCreate("organisations").BindFunc(func(e *core.RecordEvent) error {
		e.Next()

		record := e.Record
		userId := record.GetString("owner_id")

		if userId != "" {
			// get the user and update their org_ids with the new organisation
			user, err := app.FindRecordById("users", userId)
			if err != nil {
				log.Printf("Error finding user %s: %v", userId, err)
				return err
			}

			user.Set("org_ids", append(user.GetStringSlice("org_ids"), record.Id))

			err = app.Save(user)
			if err != nil {
				log.Printf("Error saving user %s: %v", userId, err)
				return err
			}

			// add this user as an "owner" member of the organisation
			membersCol, err := app.FindCollectionByNameOrId("members")
			if err != nil {
				log.Printf("Error finding collection members: %v", err)
				return err
			}

			member := core.NewRecord(membersCol)

			member.Set("name", user.GetString("name"))
			member.Set("active", true)
			member.Set("permission_level", 4)

			member.Set("owner_id", userId)
			member.Set("user_id", userId)
			member.Set("org_id", record.Id)

			err = app.Save(member)
			if err != nil {
				log.Printf("Error creating member for user %s in organisation %s: %v", userId, record.Id, err)
				return err
			}

		}
		return nil
	})

	app.OnRecordCreateRequest().BindFunc(func(e *core.RecordRequestEvent) error {
		auth := e.Auth
		if auth != nil {
			userId := auth.Id
			orgId := auth.GetString("org_id")

			collection := e.Record.Collection()

			userIdField := collection.Fields.GetByName("owner_id")
			if userIdField != nil {
				e.Record.Set("owner_id", userId)
			}

			orgIdField := collection.Fields.GetByName("org_id")
			if orgIdField != nil {
				e.Record.Set("org_id", orgId)
			}
		}
		return e.Next()
	})

	// Must start PocketBase before doing any queries
	err := app.Start()
	if err != nil {
		log.Fatalf("Failed to start PocketBase: %v", err)
	}
}
