package main

import (
	"testing"
	"net/http/httptest"
	"io"

	"github.com/stretchr/testify/assert"
)

func TestSetupRouter(t *testing.T) {
	test_router := SetupRouter()

	mockResponse := `{"hi":"world"}`

	req := httptest.NewRequest("GET", "/api/account", nil)

	w := httptest.NewRecorder()

	test_router.ServeHTTP(w, req)

	responseData, _ := io.ReadAll(w.Body)

	assert.Equal(t, mockResponse, string(responseData))

}