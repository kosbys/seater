package utils

import (
	"errors"
	"strconv"
)

func UserIDtoUInt(userID any) (uint, error) {
	var userIDUint uint

	switch id := userID.(type) {
	case float64:
		userIDUint = uint(id)
	case int:
		userIDUint = uint(id)
	case uint:
		userIDUint = id
	case string:
		parsedID, err := strconv.ParseUint(id, 10, 64)
		if err != nil {

			return 0, err
		}
		userIDUint = uint(parsedID)
	default:
		return 0, errors.New("invalid id")
	}

	return userIDUint, nil
}
