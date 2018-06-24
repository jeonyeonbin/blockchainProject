package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
	"github.com/satori/go.uuid"
)

// Smart Contrect 구조체
type TTIN struct {
}

type User struct {
	ObjectType   string `json:"docType"`      // 객체 유형
	Identity     string `josn:"identity"`     // 유저 아이디
	Password     string `json:"password"`     // 유저 비밀번호 (해시)
	Name         string `json:"name"`         // 유저 이름
	Birth        string `json:"birth"`        // 유저 생년월일
	LastIdNumber string `json:"lastIdNumber"` // 유저 주민등록번호 뒷자리 (해시)
	Phone        string `json:"phone"`        // 유저 핸드폰 번호
	Email        string `json:"email"`        // 유저 이메일
	Address      string `json:"address"`      // 유저 주소
	AmountOfCoin int    `json:"amountOfCoin"` // 유저 코인 개수
}

type Item struct {
	ObjectType      string `json:"docType"`         // 객체 유형
	Seller          string `json:"seller"`          // 판매자 아이디
	ItemName        string `json:"itemName"`        // 상품 이름
	ItemInfo        string `json:"itemInfo"`        // 상품 정보
	ItemPrice       int    `json:"itemPrice"`       // 상품 가격
	ItemCategory    string `json:"itemCategory"`    // 상품 카테고리
	ItemPic         string `json:"itemPic"`         // 상품 목록 사진 경로
	ItemContentsPic string `json:"itemContentsPic"` // 상품 내용 사진 경로
	RegistDateTime  string `json:"registDateTime"`  // 등록 날짜 및 시간
	ChangeDateTime  string `json:"changeDateTime"`  // 수정 날짜 및 시간
	SellState       string `json:"sellState"`       // 거래 상태
	Hits            int    `json:"hits"`            // 상품 조회 수
}

func (s *TTIN) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

func (s *TTIN) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	function, args := APIstub.GetFunctionAndParameters()

	if function == "initLedger" {
		return s.initLedger(APIstub)
	} else if function == "queryItem" {
		return s.queryItem(APIstub, args)
	} else if function == "queryItemByList" {
		return s.queryItemByList(APIstub, args)
	} else if function == "queryItemByCategory" {
		return s.queryItemByCategory(APIstub, args)
	} else if function == "queryItemAll" {
		return s.queryItemAll(APIstub)
	} else if function == "increasHits" {
		return s.increasHits(APIstub, args)
	} else if function == "registItem" {
		return s.registItem(APIstub, args)
	} else if function == "updateItem" {
		return s.updateItem(APIstub, args)
	} else if function == "registUser" {
		return s.registUser(APIstub, args)
	} else if function == "updateUser" {
		return s.updateUser(APIstub, args)
	} else if function == "addCoin" {
		return s.addCoin(APIstub, args)
	} else if function == "purchaseItem" {
		return s.purchaseItem(APIstub, args)
	} else if function == "loginUser" {
		return s.loginUser(APIstub, args)
	} else if function == "queryUser" {
		return s.queryUser(APIstub, args)
	} else if function == "identityOverlapCheck" {
		return s.identityOverlapCheck(APIstub, args)
	}

	return shim.Error("Invalid Smart Contract function name.")
}

func (s *TTIN) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {
	user_keys := []string{"root", "sumin"}
	users := []User{
		User{
			ObjectType:   "user",
			Identity:     "root",
			Password:     "92800192cb6359cfb08cd5be4b97599048185451e773afbcef966c6988ce5cf5",
			Name:         "전연빈",
			Birth:        "930000",
			LastIdNumber: "1111111",
			Phone:        "01077775780",
			Email:        "jyb5858@naver.com",
			Address:      "경기도 하남시 덕풍1동",
			AmountOfCoin: 0,
		},
		User{
			ObjectType:   "user",
			Identity:     "sumin",
			Password:     "92800192cb6359cfb08cd5be4b97599048185451e773afbcef966c6988ce5cf5",
			Name:         "황수민",
			Birth:        "940000",
			LastIdNumber: "1111111",
			Phone:        "01045937244",
			Email:        "sumin974@outlook.com",
			Address:      "경기도 수원시 장안구",
			AmountOfCoin: 0,
		},
	}

	item_keys := []string{"4c152fe0-2699-4408-b682-ee2fb723fc10"}
	items := []Item{
		Item{
			ObjectType:      "item",
			Seller:          "root",
			ItemName:        "파고나티아티셔츠",
			ItemInfo:        "\u003cp\u003e파고나티아 티셔츠입니다",
			ItemPrice:       10000,
			ItemCategory:    "cloth",
			ItemPic:         "../uploads/data/root-1528734977353",
			ItemContentsPic: "uploads/image-1528734977344",
			RegistDateTime:  "2018-06-11 16:36:24",
			ChangeDateTime:  "2018-06-11 16:36:24",
			SellState:       "selling",
			Hits:            0,
		},
		Item{
			ObjectType:      "item",
			Seller:          "sumin",
			ItemName:        "아디다스 축구공",
			ItemInfo:        "\u003cp\u003e아디다스 100% 정품입니다\u003c/p\u003e\r\n",
			ItemPrice:       30000,
			ItemCategory:    "sports",
			ItemPic:         "../uploads/data/sumin-1528741362827",
			ItemContentsPic: "uploads/image-1528741362821",
			RegistDateTime:  "2018-06-11 18:22:57",
			ChangeDateTime:  "2018-06-11 18:22:57",
			SellState:       "sold",
			Hits:            0,
		},
	}

	i := 0
	for i < len(users) {
		userAsBytes, _ := json.Marshal(users[i])
		APIstub.PutState(user_keys[i], userAsBytes)
		i = i + 1
	}

	i = 0
	for i < len(items) {
		itemAsBytes, _ := json.Marshal(items[i])
		APIstub.PutState(item_keys[i], itemAsBytes)
		i = i + 1
	}

	return shim.Success(nil)
}

func (s *TTIN) queryItem(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	// 0, itemKey

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	itemAsBytes, err := APIstub.GetState(args[0])
	if err != nil {
		jsonResp := "{\"Error\":\"Failed to get state for " + args[0] + "\"}"
		return shim.Error(jsonResp)
	}

	var buffer bytes.Buffer
	valueString := string(itemAsBytes)
	valueString = strings.Replace(valueString, "{", "{"+"\"key\":"+"\""+args[0]+"\",", 1)
	buffer.WriteString(valueString)

	return shim.Success(buffer.Bytes())
}

func (s *TTIN) queryItemByList(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	// 0-, itemKeys[]

	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments. Minimum 1")
	}

	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	i := 0
	for i < len(args) {
		itemAsBytes, err := APIstub.GetState(args[i])
		if err != nil {
			jsonResp := "{\"Error\":\"Failed to get state for " + args[i] + "\"}"
			return shim.Error(jsonResp)
		}

		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}

		buffer.WriteString(string(itemAsBytes))

		i = i + 1
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	return shim.Success(buffer.Bytes())
}

func (s *TTIN) queryItemByCategory(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	// 0, itemCategory

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	queryString := fmt.Sprintf("{\"selector\":{\"docType\":\"item\",\"itemCategory\":\"%s\"}}", args[0])

	resultsIterator, err := APIstub.GetQueryResult(queryString)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}

		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		valueString := string(queryResponse.Value)
		valueString = strings.Replace(valueString, "{", "{"+"\"key\":"+"\""+queryResponse.Key+"\",", 1)

		buffer.WriteString(string(valueString))
		bArrayMemberAlreadyWritten = true
	}

	buffer.WriteString("]")

	return shim.Success(buffer.Bytes())
}

func (s *TTIN) queryItemAll(APIstub shim.ChaincodeStubInterface) sc.Response {
	//	\"sort\":[{\"registDateTime\":\"desc\"}]
	queryString := fmt.Sprintf("{\"selector\":{\"docType\":\"item\"}}")

	resultsIterator, err := APIstub.GetQueryResult(queryString)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}

		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}

		valueString := string(queryResponse.Value)
		valueString = strings.Replace(valueString, "{", "{"+"\"key\":"+"\""+queryResponse.Key+"\",", 1)

		buffer.WriteString(string(valueString))
		bArrayMemberAlreadyWritten = true
	}

	buffer.WriteString("]")

	return shim.Success(buffer.Bytes())
}

func (s *TTIN) increasHits(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	itemAsBytes, err := APIstub.GetState(args[0])
	if err != nil {
		return shim.Error("Failed to get state")
	}
	if itemAsBytes == nil {
		return shim.Error("Already not exist " + args[0])
	}

	item := Item{}
	json.Unmarshal(itemAsBytes, &item)

	item.Hits++

	itemAsBytes, err = json.Marshal(item)
	if err != nil {
		return shim.Error(err.Error())
	}

	err = APIstub.PutState(args[0], itemAsBytes)
	if err != nil {
		return shim.Error("Failed to put state")
	}

	return shim.Success(nil)
}

func (s *TTIN) registItem(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	// 0, seller (user:identity)
	// 1, itemName
	// 2, itemInfo
	// 3, itemPrice
	// 4, itemCategory
	// 5, itemPic
	// 6, itemContentsPic

	if len(args) != 7 {
		return shim.Error("Incorrect number of arguments. Expecting 7")
	}

	uuid, err := uuid.NewV4()
	if err != nil {
		return shim.Error("Failed to generate uuid")
	}

	itemKey := uuid.String()

	itemAsBytes, err := APIstub.GetState(itemKey)
	if err != nil {
		return shim.Error("Failed to get state")
	}
	if itemAsBytes != nil {
		return shim.Error("Already exist " + itemKey)
	}

	now := time.Now().Format("2006-01-02 15:04:05")

	itemPrice, err := strconv.Atoi(args[3])
	if err != nil {
		shim.Error("Failed to casting")
	}
	if itemPrice < 1 {
		shim.Error("amount of coin must be an integer greater than or equal to 1")
	}

	var item = Item{
		ObjectType:      "item",
		Seller:          args[0],
		ItemName:        args[1],
		ItemInfo:        args[2],
		ItemPrice:       itemPrice,
		ItemCategory:    args[4],
		ItemPic:         args[5],
		ItemContentsPic: args[6],
		RegistDateTime:  now,
		ChangeDateTime:  now,
		SellState:       "selling",
		Hits:            0,
	}

	itemAsBytes, err = json.Marshal(item)
	if err != nil {
		return shim.Error(err.Error())
	}

	err = APIstub.PutState(itemKey, itemAsBytes)
	if err != nil {
		return shim.Error("Failed to put state")
	}

	return shim.Success(nil)
}

func (s *TTIN) updateItem(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	// 0, itemKey
	// 1, itemName
	// 2, itemInfo
	// 3, itemPrice
	// 4, itemCategory
	// 5, itemPic
	// 6, itemContentsPic

	if len(args) != 8 {
		return shim.Error("Incorrect number of arguments. Expecting 7")
	}

	itemAsBytes, err := APIstub.GetState(args[0])
	if err != nil {
		return shim.Error("Failed to get state")
	}
	if itemAsBytes == nil {
		return shim.Error("Already not exist " + args[0])
	}

	now := time.Now().Format("2006-01-02 15:04:05")

	var item = Item{}
	json.Unmarshal(itemAsBytes, &item)

	itemPrice, err := strconv.Atoi(args[3])
	if err != nil {
		shim.Error("Failed to casting")
	}
	if itemPrice < 1 {
		shim.Error("itemPrice must be an integer greater than or equal to 1")
	}

	item.ItemName = args[1]
	item.ItemInfo = args[2]
	item.ItemPrice = itemPrice
	item.ItemCategory = args[4]
	item.ItemPic = args[5]
	item.ItemContentsPic = args[6]
	item.ChangeDateTime = now

	itemAsBytes, err = json.Marshal(item)
	if err != nil {
		return shim.Error(err.Error())
	}

	err = APIstub.PutState(args[0], itemAsBytes)
	if err != nil {
		return shim.Error("Failed to put state")
	}

	return shim.Success(nil)
}

func (s *TTIN) registUser(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	// 0, identity
	// 1, password
	// 2, name
	// 3, birth
	// 4, lastIdNumber
	// 5, phone
	// 6, email
	// 7, address

	if len(args) != 8 {
		return shim.Error("Incorrect number of arguments. Expecting 8")
	}

	userAsBytes, err := APIstub.GetState(args[0])
	if err != nil {
		return shim.Error("Failed to get state")
	}
	if userAsBytes != nil {
		return shim.Error("Already exist " + args[0])
	}

	var user = User{
		ObjectType:   "user",
		Identity:     args[0],
		Password:     args[1],
		Name:         args[2],
		Birth:        args[3],
		LastIdNumber: args[4],
		Phone:        args[5],
		Email:        args[6],
		Address:      args[7],
		AmountOfCoin: 0,
	}

	userAsBytes, err = json.Marshal(user)
	if err != nil {
		return shim.Error(err.Error())
	}

	APIstub.PutState(args[0], userAsBytes)

	return shim.Success(nil)
}

func (s *TTIN) updateUser(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	// 0, identity
	// 1, password
	// 2, name
	// 3, phone
	// 4, email
	// 5, address

	if len(args) != 8 {
		return shim.Error("Incorrect number of arguments. Expecting 7")
	}

	userAsBytes, err := APIstub.GetState(args[0])
	if err != nil {
		return shim.Error("Failed to get state")
	}
	if userAsBytes == nil {
		return shim.Error("Already not exist " + args[0])
	}

	var user = User{}
	json.Unmarshal(userAsBytes, &user)

	user.Password = args[1]
	user.Name = args[2]
	user.Phone = args[3]
	user.Email = args[4]
	user.Address = args[5]

	userAsBytes, err = json.Marshal(user)
	if err != nil {
		return shim.Error(err.Error())
	}

	err = APIstub.PutState(args[0], userAsBytes)
	if err != nil {
		return shim.Error("Failed to put state")
	}

	return shim.Success(nil)
}

func (s *TTIN) addCoin(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	// 0, identity
	// 1, amountOfCoin

	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}

	userAsBytes, err := APIstub.GetState(args[0])
	if err != nil {
		return shim.Error("Failed to get state")
	}
	if userAsBytes == nil {
		return shim.Error("Already not exist " + args[0])
	}

	var user = User{}
	json.Unmarshal(userAsBytes, &user)

	coin, err := strconv.Atoi(args[1])
	if err == nil {
		shim.Error("Failed to casting")
	}
	if coin < 1 {
		shim.Error("amount of coin must be an integer greater than or equal to 1")
	}

	user.AmountOfCoin += coin

	userAsBytes, err = json.Marshal(user)
	if err != nil {
		return shim.Error(err.Error())
	}

	err = APIstub.PutState(args[0], userAsBytes)
	if err != nil {
		return shim.Error("Failed to put state")
	}

	return shim.Success(nil)
}

func (s *TTIN) purchaseItem(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	// 0, itemKey
	// 1, identity (구매자)

	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}

	itemAsBytes, err := APIstub.GetState(args[0])
	if err != nil {
		return shim.Error("Failed to get state")
	}
	if itemAsBytes == nil {
		return shim.Error("Already not exist " + args[0])
	}

	var item = Item{}
	json.Unmarshal(itemAsBytes, &item)

	userAsBytes, err := APIstub.GetState(args[1])
	if err != nil {
		return shim.Error("Failed to get state")
	}
	if userAsBytes == nil {
		return shim.Error("Already not exist " + args[1])
	}

	var user = User{}
	json.Unmarshal(userAsBytes, &user)

	if (user.AmountOfCoin - item.ItemPrice) < 0 {
		return shim.Error("Not enough coins")
	}

	user.AmountOfCoin -= item.ItemPrice
	item.SellState = "sold"

	itemAsBytes, err = json.Marshal(item)
	if err != nil {
		return shim.Error(err.Error())
	}

	err = APIstub.PutState(args[0], itemAsBytes)
	if err != nil {
		return shim.Error("Failed to put state")
	}

	userAsBytes, err = json.Marshal(user)
	if err != nil {
		return shim.Error(err.Error())
	}

	err = APIstub.PutState(args[1], userAsBytes)
	if err != nil {
		return shim.Error("Failed to put state")
	}

	return shim.Success(nil)
}

func (s *TTIN) loginUser(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	// 0, identity
	// 1, password

	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}

	userAsBytes, err := APIstub.GetState(args[0])
	if err != nil {
		return shim.Error("Failed to get state")
	}
	if userAsBytes == nil {
		return shim.Error("Already not exist " + args[0])
	}

	user := User{}
	json.Unmarshal(userAsBytes, &user)

	if args[1] == user.Password {
		return shim.Success(nil)
	} else {
		return shim.Error("Login Fail")
	}
}

func (s *TTIN) queryUser(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	// 0, identity

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	userAsBytes, err := APIstub.GetState(args[0])
	if err != nil {
		jsonResp := "{\"Error\":\"Failed to get state for " + args[0] + "\"}"
		return shim.Error(jsonResp)
	}

	return shim.Success(userAsBytes)
}

func (s *TTIN) identityOverlapCheck(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	// 0, identity

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	userAsBytes, err := APIstub.GetState(args[0])
	if err != nil {
		return shim.Error("Failed to get state")
	}

	if userAsBytes == nil {
		return shim.Success(nil)
	} else {
		return shim.Error("Already exist identity")
	}
}

func main() {

	// Create a new Smart Contract
	err := shim.Start(new(TTIN))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
